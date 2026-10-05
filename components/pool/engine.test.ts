import {
  BREAK_MESSAGE,
  PoolEngine,
  RACK_ORDER,
  isOwn,
  pocketsFor,
  roll,
  tableConfig,
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
