import {
  BREAK_MESSAGE,
  FOOT_SPOT,
  HEAD_STRING,
  PoolEngine,
  RACK_ORDER,
  SINK_RATE,
  isOwn,
  pocketsFor,
  roll,
  tableConfig,
  type Shot,
} from "./engine";

// Deterministic rng so racks and AI error are repeatable.
function seeded(seed = 1) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function setup(mobile = false) {
  return new PoolEngine(tableConfig(mobile), seeded());
}

// Park every object ball in a harmless corner of the table, then place the
// ones a test cares about.
function clearTable(e: PoolEngine) {
  e.balls.forEach((b, i) => {
    if (i === 0) return;
    b.u = 100 + i * 5;
    b.v = 20;
    b.du = 0;
    b.dv = 0;
  });
}

function runUntilResolved(e: PoolEngine, maxFrames = 2000) {
  for (let i = 0; i < maxFrames; i++) {
    const resolved = e.step();
    e.tickSinks();
    if (resolved) return true;
  }
  return false;
}

describe("tableConfig", () => {
  it("returns landscape desktop and portrait mobile sizes", () => {
    expect(tableConfig(false)).toEqual({ L: 960, Wd: 480, r: 12, maxV: 26 });
    expect(tableConfig(true)).toEqual({ L: 580, Wd: 300, r: 9, maxV: 17 });
  });
});

describe("pocketsFor", () => {
  it("has four corners and two middles", () => {
    const cfg = tableConfig(false);
    const p = pocketsFor(cfg);
    expect(p).toHaveLength(6);
    expect(p.filter((x) => x.R === cfg.r * 2.1)).toHaveLength(4);
    expect(p.filter((x) => x.u === cfg.L / 2)).toHaveLength(2);
  });
});

describe("rack", () => {
  it("places 16 balls with the cue on the head string", () => {
    const e = setup();
    expect(e.balls).toHaveLength(16);
    expect(e.balls.every((b) => b.on)).toBe(true);
    expect(e.cue.u).toBe(960 * 0.25);
    expect(e.cue.v).toBe(240);
    expect(e.message).toBe(BREAK_MESSAGE);
    expect(e.turn).toBe("you");
  });

  it("puts the 8 in the centre of the third row", () => {
    const e = setup();
    const eight = e.balls[8];
    expect(RACK_ORDER[4]).toBe(8);
    expect(eight.v).toBeCloseTo(240, 5);
  });

  it("does not overlap any balls", () => {
    const e = setup();
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const d = Math.hypot(
          e.balls[i].u - e.balls[j].u,
          e.balls[i].v - e.balls[j].v,
        );
        expect(d).toBeGreaterThanOrEqual(24 - 1e-6);
      }
    }
  });

  it("is deterministic for a given rng", () => {
    const a = setup();
    const b = setup();
    expect(a.balls[3].o).toEqual(b.balls[3].o);
  });
});

describe("isOwn", () => {
  it("classifies solids and stripes", () => {
    expect(isOwn("solids", 3)).toBe(true);
    expect(isOwn("solids", 9)).toBe(false);
    expect(isOwn("stripes", 9)).toBe(true);
    expect(isOwn("stripes", 8)).toBe(false);
  });
});

describe("physics", () => {
  it("transfers momentum in a head-on collision", () => {
    const e = setup();
    clearTable(e);
    e.cue.u = 300;
    e.cue.v = 240;
    e.balls[1].u = 340;
    e.balls[1].v = 240;
    e.shoot(0, 0.5);
    for (let i = 0; i < 10; i++) e.step();
    expect(e.balls[1].du).toBeGreaterThan(0);
    expect(Math.abs(e.cue.du)).toBeLessThan(e.balls[1].du);
    expect(e.shot?.firstHit).toBe(1);
  });

  it("slows balls with friction until the shot resolves", () => {
    const e = setup();
    clearTable(e);
    e.shoot(Math.PI / 4, 0.1);
    expect(runUntilResolved(e)).toBe(true);
    expect(e.moving).toBe(false);
  });

  it("pots a ball that rolls into a corner pocket", () => {
    const e = setup();
    clearTable(e);
    e.balls[1].u = 40;
    e.balls[1].v = 40;
    e.cue.u = 300;
    e.cue.v = 300;
    e.balls[1].du = -6;
    e.balls[1].dv = -6;
    e.shot = {
      shooter: "you",
      firstHit: 1,
      potted: [],
      scratch: false,
      clearedBefore: false,
    };
    e.moving = true;
    runUntilResolved(e);
    expect(e.balls[1].on).toBe(false);
  });
});

describe("sinking", () => {
  function potBall(e: PoolEngine, n: number) {
    clearTable(e);
    e.cue.u = 300;
    e.cue.v = 300;
    e.balls[n].u = 40;
    e.balls[n].v = 40;
    e.balls[n].du = -6;
    e.balls[n].dv = -6;
    e.shot = {
      shooter: "you",
      firstHit: n,
      potted: [],
      scratch: false,
      clearedBefore: false,
    };
    e.moving = true;
    for (let i = 0; i < 60 && e.potEvents.length === 0; i++) e.step();
  }

  it("queues one pot event with the pocket index", () => {
    const e = setup();
    potBall(e, 1);
    expect(e.potEvents).toEqual([{ n: 1, pocket: 0, scratch: false }]);
    expect(e.balls[1].sink?.pocket).toBe(0);
    expect(e.balls[1].sink?.R).toBeCloseTo(12 * 2.1, 5);
  });

  it("flags the cue ball as a scratch", () => {
    const e = setup();
    clearTable(e);
    e.cue.u = 40;
    e.cue.v = 40;
    e.cue.du = -6;
    e.cue.dv = -6;
    e.shot = {
      shooter: "you",
      firstHit: null,
      potted: [],
      scratch: false,
      clearedBefore: false,
    };
    e.moving = true;
    for (let i = 0; i < 60 && e.potEvents.length === 0; i++) e.step();
    expect(e.potEvents[0]).toMatchObject({ n: 0, scratch: true });
  });

  it("finishes the sink in about half a second", () => {
    const e = setup();
    potBall(e, 1);
    let ticks = 0;
    while (e.balls[1].sink && ticks < 100) {
      e.tickSinks();
      ticks++;
    }
    expect(ticks).toBe(Math.ceil(1 / SINK_RATE));
    expect(ticks).toBeGreaterThanOrEqual(30);
    expect(ticks).toBeLessThanOrEqual(33);
  });

  it("clears queued events on rack", () => {
    const e = setup();
    potBall(e, 1);
    e.rack();
    expect(e.potEvents).toEqual([]);
  });
});

describe("rules", () => {
  it("assigns groups on the first legal pot and keeps the turn", () => {
    const e = setup();
    e.shot = {
      shooter: "you",
      firstHit: 2,
      potted: [2],
      scratch: false,
      clearedBefore: false,
    };
    e.balls[2].on = false;
    e.moving = true;
    e.resolve();
    expect(e.groups).toEqual({ you: "solids", james: "stripes" });
    expect(e.turn).toBe("you");
    expect(e.message).toContain("You're solids.");
    expect(e.message).toContain("Nice. Shoot again.");
  });

  it("passes the turn on a miss with a no-ball-hit foul", () => {
    const e = setup();
    e.shot = {
      shooter: "you",
      firstHit: null,
      potted: [],
      scratch: false,
      clearedBefore: false,
    };
    e.resolve();
    expect(e.turn).toBe("james");
    expect(e.message).toContain("Foul: no ball hit.");
  });

  it("respots a potted cue ball on the head string", () => {
    const e = setup();
    e.cue.on = false;
    e.cue.u = 5;
    e.cue.v = 5;
    e.shot = {
      shooter: "you",
      firstHit: 1,
      potted: [],
      scratch: true,
      clearedBefore: false,
    };
    e.resolve();
    expect(e.cue.on).toBe(true);
    expect(e.cue.u).toBe(240);
    expect(e.turn).toBe("james");
    expect(e.message).toContain("Foul: cue ball potted.");
  });

  it("fouls when the wrong group is hit first", () => {
    const e = setup();
    e.groups = { you: "solids", james: "stripes" };
    e.shot = {
      shooter: "you",
      firstHit: 10,
      potted: [],
      scratch: false,
      clearedBefore: false,
    };
    e.resolve();
    expect(e.message).toContain("Foul: wrong ball hit first.");
    expect(e.turn).toBe("james");
  });

  it("wins when the 8 is sunk after clearing the group", () => {
    const e = setup();
    e.groups = { you: "solids", james: "stripes" };
    e.shot = {
      shooter: "you",
      firstHit: 8,
      potted: [8],
      scratch: false,
      clearedBefore: true,
    };
    e.resolve();
    expect(e.winner).toBe("you");
    expect(e.message).toBe("You sank the 8. You win.");
  });

  it("loses when the 8 is potted early", () => {
    const e = setup();
    e.groups = { you: "solids", james: "stripes" };
    e.shot = {
      shooter: "you",
      firstHit: 8,
      potted: [8],
      scratch: false,
      clearedBefore: false,
    };
    e.resolve();
    expect(e.winner).toBe("james");
    expect(e.message).toBe("You potted the 8 too early. James wins.");
  });

  it("loses when the 8 is sunk with the cue ball", () => {
    const e = setup();
    e.groups = { you: "solids", james: "stripes" };
    e.shot = {
      shooter: "james",
      firstHit: 8,
      potted: [8],
      scratch: true,
      clearedBefore: true,
    };
    e.resolve();
    expect(e.winner).toBe("you");
  });
});

describe("ray", () => {
  it("finds the first ball on the line and the ghost position", () => {
    const e = setup();
    clearTable(e);
    e.cue.u = 200;
    e.cue.v = 240;
    e.balls[3].u = 400;
    e.balls[3].v = 240;
    const hit = e.ray(e.cue, 0);
    expect(hit.hit?.n).toBe(3);
    expect(hit.gu).toBeCloseTo(400 - 24, 5);
  });

  it("stops at the cushion when nothing is in the way", () => {
    const e = setup();
    clearTable(e);
    e.cue.u = 200;
    e.cue.v = 240;
    const hit = e.ray(e.cue, 0);
    expect(hit.hit).toBeNull();
    expect(hit.gu).toBeCloseTo(960 - 12, 5);
  });
});

describe("planAi", () => {
  it("aims the break at the 1 ball with high power", () => {
    const e = setup();
    const plan = e.planAi(0);
    expect(plan.power).toBe(0.95);
    expect(Math.abs(plan.ang)).toBeLessThan(0.2);
  });

  it("picks a pottable shot when one exists", () => {
    const e = setup();
    clearTable(e);
    e.groups = { you: "stripes", james: "solids" };
    e.cue.u = 200;
    e.cue.v = 200;
    e.balls[1].u = 60;
    e.balls[1].v = 120;
    // A ball off the table so this is not treated as the break.
    e.balls[15].on = false;
    const plan = e.planAi(0);
    expect(plan.power).toBeGreaterThan(0.29);
    expect(plan.power).toBeLessThanOrEqual(0.92);
  });

  it("returns an angle within pi of the current aim", () => {
    const e = setup();
    const plan = e.planAi(10);
    expect(Math.abs(plan.ang - 10)).toBeLessThanOrEqual(Math.PI + 0.1);
  });
});

describe("roll", () => {
  it("keeps orientation vectors roughly unit length", () => {
    const e = setup();
    const b = e.balls[1];
    for (let i = 0; i < 40; i++) roll(b, 3, 1, 12, () => 0);
    const len = Math.hypot(...b.o.n);
    expect(len).toBeGreaterThan(0.99);
    expect(len).toBeLessThan(1.01);
  });
});

describe("regulation rack", () => {
  it("puts the front ball on the foot spot at 0.75L", () => {
    const e = setup();
    expect(FOOT_SPOT).toBe(0.75);
    expect(e.balls[1].u).toBeCloseTo(960 * 0.75, 5);
    expect(e.balls[1].v).toBeCloseTo(240, 5);
  });

  it("racks each row tight against the one in front", () => {
    const e = setup();
    const r = 12;
    // Second row: balls 9 and 2 sit r*2*0.8661 behind the apex, 2r + 0.02 apart.
    expect(e.balls[9].u - e.balls[1].u).toBeCloseTo(r * 2 * 0.8661, 5);
    expect(Math.abs(e.balls[9].v - e.balls[2].v)).toBeCloseTo(2 * r + 0.02, 5);
  });

  it("keeps the cue ball on the head string", () => {
    const e = setup();
    expect(HEAD_STRING).toBe(0.25);
    expect(e.cue.u).toBe(960 * HEAD_STRING);
  });

  it("starts with ball in hand in the kitchen", () => {
    expect(setup().place).toBe("kitchen");
  });
});

describe("cueSpotOk and placeCue", () => {
  it("keeps the cue ball a radius clear of every cushion", () => {
    const e = setup();
    e.place = "anywhere";
    clearTable(e);
    expect(e.cueSpotOk(11, 240)).toBe(false);
    expect(e.cueSpotOk(12, 240)).toBe(true);
    expect(e.cueSpotOk(960 - 11, 240)).toBe(false);
    expect(e.cueSpotOk(500, 11)).toBe(false);
    expect(e.cueSpotOk(500, 480 - 11)).toBe(false);
  });

  it("limits the break to behind the head string", () => {
    const e = setup();
    clearTable(e);
    expect(e.place).toBe("kitchen");
    expect(e.cueSpotOk(960 * 0.25, 240)).toBe(true);
    expect(e.cueSpotOk(960 * 0.25 + 1, 240)).toBe(false);
    e.place = "anywhere";
    expect(e.cueSpotOk(960 * 0.25 + 1, 240)).toBe(true);
  });

  it("refuses spots too close to another ball", () => {
    const e = setup();
    e.place = "anywhere";
    clearTable(e);
    e.balls[3].u = 400;
    e.balls[3].v = 240;
    expect(e.cueSpotOk(400 + 12 * 2.05 - 0.1, 240)).toBe(false);
    expect(e.cueSpotOk(400 + 12 * 2.05, 240)).toBe(true);
  });

  it("clamps a placement into the kitchen", () => {
    const e = setup();
    clearTable(e);
    expect(e.placeCue(700, 900)).toBe(true);
    expect(e.cue.u).toBe(960 * 0.25);
    expect(e.cue.v).toBe(480 - 12);
  });

  it("ignores a placement onto another ball and keeps the old spot", () => {
    const e = setup();
    e.place = "anywhere";
    clearTable(e);
    e.cue.u = 200;
    e.cue.v = 200;
    e.balls[3].u = 400;
    e.balls[3].v = 240;
    expect(e.placeCue(405, 240)).toBe(false);
    expect([e.cue.u, e.cue.v]).toEqual([200, 200]);
  });

  it("does nothing when there is no ball in hand", () => {
    const e = setup();
    e.place = null;
    expect(e.placeCue(100, 100)).toBe(false);
  });

  it("ends ball in hand when a shot is taken", () => {
    const e = setup();
    expect(e.place).toBe("kitchen");
    e.shoot(0, 0.5);
    expect(e.place).toBeNull();
  });
});

describe("ball in hand after fouls", () => {
  const shot = (shooter: "you" | "james", over: Partial<Shot> = {}): Shot => ({
    shooter,
    firstHit: null,
    potted: [],
    scratch: false,
    clearedBefore: false,
    ...over,
  });

  it("gives James ball in hand when you foul", () => {
    const e = setup();
    e.shot = shot("you");
    e.resolve();
    expect(e.turn).toBe("james");
    expect(e.place).toBe("anywhere");
    expect(e.message).toBe("Foul: no ball hit. James has ball in hand.");
  });

  it("gives you ball in hand when James fouls", () => {
    const e = setup();
    e.turn = "james";
    e.shot = shot("james");
    e.resolve();
    expect(e.turn).toBe("you");
    expect(e.place).toBe("anywhere");
    expect(e.message).toBe(
      "Foul: no ball hit. Ball in hand: drag the white anywhere, then shoot.",
    );
  });

  it("covers a potted cue ball too, respotted on the head string", () => {
    const e = setup();
    e.cue.on = false;
    e.shot = shot("you", { firstHit: 1, scratch: true });
    e.resolve();
    expect(e.place).toBe("anywhere");
    expect(e.cue.u).toBe(960 * HEAD_STRING);
    expect(e.message).toContain("James has ball in hand.");
  });

  it("clears ball in hand after a legal shot", () => {
    const e = setup();
    e.place = "kitchen";
    e.groups = { you: "solids", james: "stripes" };
    e.shot = shot("you", { firstHit: 2 });
    e.resolve();
    expect(e.place).toBeNull();
    expect(e.message).toBe("James is lining up a shot.");
  });
});

describe("James with ball in hand", () => {
  it("picks a legal spot inside the kitchen on the break", () => {
    const e = setup();
    const p = e.pickPlacement();
    expect(p.u).toBeLessThanOrEqual(960 * 0.25);
    expect(e.cueSpotOk(p.u, p.v)).toBe(true);
  });

  it("picks a spot that has a shot when anywhere is allowed", () => {
    const e = setup();
    clearTable(e);
    e.place = "anywhere";
    e.groups = { you: "stripes", james: "solids" };
    e.balls[15].on = false;
    // A single target near a pocket, with the cue ball far from a good angle.
    e.balls[1].u = 120;
    e.balls[1].v = 90;
    e.cue.u = 800;
    e.cue.v = 400;
    const p = e.pickPlacement();
    expect(e.cueSpotOk(p.u, p.v)).toBe(true);
    const chosen = e.bestShot(p);
    expect(chosen).not.toBeNull();
    const original = e.bestShot({ u: 800, v: 400 });
    if (original) expect(chosen!.score).toBeLessThanOrEqual(original.score);
  });

  it("stays put when no placement gives a shot", () => {
    const e = setup();
    clearTable(e);
    e.place = "anywhere";
    e.groups = { you: "stripes", james: "solids" };
    for (const n of [1, 2, 3, 4, 5, 6, 7]) e.balls[n].on = false;
    e.balls[8].on = false;
    e.cue.u = 300;
    e.cue.v = 200;
    expect(e.pickPlacement()).toEqual({ u: 300, v: 200 });
  });

  it("plans a shot from an explicit origin without moving the cue ball", () => {
    const e = setup();
    clearTable(e);
    e.place = "anywhere";
    e.groups = { you: "stripes", james: "solids" };
    e.balls[15].on = false;
    e.balls[1].u = 120;
    e.balls[1].v = 90;
    e.cue.u = 800;
    e.cue.v = 400;
    const from = { u: 260, v: 140 };
    const plan = e.planAi(0, from);
    // Aiming at the ghost ball for ball 1 from the origin, not from the cue ball.
    const angToBall = Math.atan2(90 - from.v, 120 - from.u);
    expect(Math.abs(plan.ang - angToBall)).toBeLessThan(0.5);
    expect([e.cue.u, e.cue.v]).toEqual([800, 400]);
  });
});
