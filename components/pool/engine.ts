/**
 * @file Pure 8-ball pool engine. No DOM, no React.
 *
 * Positions are in table space: u runs along the long side (0..L), v across
 * it (0..Wd). The renderer maps (u, v) to screen coordinates, which lets one
 * engine serve both the landscape (desktop) and portrait (mobile) tables.
 *
 * The engine owns physics, the simplified 8-ball rules and the computer opponent (James).
 * The renderer drives it once per animation frame: `step()` then
 * `tickSinks()`, and reads `balls`, `turn`, `message` and `winner` back.
 */

export type Player = "you" | "james";
export type Group = "solids" | "stripes";
export type Vec3 = [number, number, number];

/** Table dimensions in px. */
export interface TableConfig {
  /** Length of the felt along the long side (u). */
  L: number;
  /** Width of the felt across the table (v). */
  Wd: number;
  /** Ball radius. */
  r: number;
  /** Maximum shot speed in px per frame. */
  maxV: number;
}

/** Where a ball's markings point, as unit vectors in screen space (z towards the viewer). */
export interface Orientation {
  /** Pole carrying the number disc. */
  n: Vec3;
  /** Axis through the two stripe caps. */
  a: Vec3;
  /** Tangent that fixes the number's rotation about `n`. */
  t1: Vec3;
}

/** A potted ball rolling into its pocket. */
export interface Sink {
  /** 0 to 1 over about half a second. */
  t: number;
  /** Index into `PoolEngine.pockets`. */
  pocket: number;
  /** Radius of that pocket. */
  R: number;
  /** Where the ball was when potted. */
  u0: number;
  v0: number;
  /** Pocket centre. */
  pu: number;
  pv: number;
}

export interface Ball {
  /** Ball number: 0 is the cue ball, 1-7 solids, 8 the black, 9-15 stripes. */
  n: number;
  u: number;
  v: number;
  /** Velocity in px per frame. */
  du: number;
  dv: number;
  /** True while the ball is on the felt. */
  on: boolean;
  /** Set while a potted ball is animating into its pocket. */
  sink: Sink | null;
  o: Orientation;
}

/** Emitted once when a ball is potted so the renderer can add effects. */
export interface PotEvent {
  n: number;
  pocket: number;
  scratch: boolean;
}

/** A pocket centre and capture radius, in table space. */
export interface Pocket {
  u: number;
  v: number;
  R: number;
}

/** Bookkeeping for the shot in flight, used to judge fouls when it stops. */
export interface Shot {
  shooter: Player;
  /** Number of the first ball the cue ball touched. */
  firstHit: number | null;
  potted: number[];
  scratch: boolean;
  /** Whether the shooter had already cleared their group before this shot. */
  clearedBefore: boolean;
}

/** First contact of the cue ball along a ray. */
export interface RayResult {
  /** Distance travelled before contact. */
  t: number;
  /** Object ball struck, or null when a cushion comes first. */
  hit: Ball | null;
  /** Cue ball centre at contact (the "ghost ball"). */
  gu: number;
  gv: number;
}

/** A shot chosen for James. */
export interface OpponentPlan {
  /** Aim angle in radians. */
  ang: number;
  /** Power from 0 to 1. */
  power: number;
}

/** Rack order from the apex, so the 8 sits in the middle and the back corners differ. */
export const RACK_ORDER = [1, 9, 2, 10, 8, 3, 11, 7, 14, 4, 5, 13, 15, 6, 12];
export const SUBSTEPS = 8;
/** Sink progress per frame (t runs 0 to 1, about half a second at 60fps). */
export const SINK_RATE = 0.032;
/** Sink progress at which the ball reaches the pocket centre and stops rolling. */
export const SINK_ROLL_END = 0.45;
/** Sink progress at which the ball starts to shrink and darken inside the hole. */
export const SINK_FALL_START = 0.2;
/** Sink progress at which the falling ball starts to fade out. */
export const SINK_FADE_START = 0.8;
/** The head string, as a fraction of the table length from the head rail. */
export const HEAD_STRING = 0.25;
/** The foot spot (the rack apex), as a fraction of the table length. */
export const FOOT_SPOT = 0.75;
export const BREAK_MESSAGE =
  "Your break. Drag the white to place it behind the line, then aim and drag to shoot.";
/** Gap between neighbouring balls in the rack, as a spacing beyond 2r. */
const RACK_GAP = 0.02;
/** A cue ball placement must keep at least this many radii from other balls. */
const PLACE_CLEARANCE = 2.05;
/** James samples this many columns and rows when choosing where to place the cue ball. */
const PLACE_GRID_U = 17;
const PLACE_GRID_V = 9;

export type Rng = () => number;

/**
 * Where the player to shoot may put the cue ball. `kitchen` is behind the head
 * string (the break), `anywhere` is ball in hand after a foul, null is none.
 */
export type Placement = "kitchen" | "anywhere" | null;

/** A shot chosen for James, with the score the chooser ranked it by (lower is better). */
export interface ScoredShot extends OpponentPlan {
  score: number;
}

const normalise = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/** Dimensions for the portrait (mobile) or landscape (desktop) table. */
export function tableConfig(mobile: boolean): TableConfig {
  return mobile
    ? { L: 580, Wd: 300, r: 9, maxV: 17 }
    : { L: 960, Wd: 480, r: 12, maxV: 26 };
}

/** Six pockets: four corners and the middle of each long rail. */
export function pocketsFor({ L, Wd, r }: TableConfig): Pocket[] {
  const corner = r * 2.1;
  const side = r * 1.9;
  return [
    { u: 0, v: 0, R: corner },
    { u: L / 2, v: -r * 0.6, R: side },
    { u: L, v: 0, R: corner },
    { u: 0, v: Wd, R: corner },
    { u: L / 2, v: Wd + r * 0.6, R: side },
    { u: L, v: Wd, R: corner },
  ];
}

/** Whether ball `n` belongs to `group` (the 8 and cue ball belong to neither). */
export function isOwn(group: Group, n: number): boolean {
  return group === "solids" ? n > 0 && n < 8 : n > 8;
}

/** Game state, physics, rules and the computer opponent for one 8-ball match against James. */
export class PoolEngine {
  readonly cfg: TableConfig;
  readonly pockets: Pocket[];
  private rng: Rng;

  balls: Ball[] = [];
  groups: Record<Player, Group | null> = { you: null, james: null };
  turn: Player = "you";
  winner: Player | null = null;
  moving = false;
  shot: Shot | null = null;
  /** Shots taken since the last rack; 0 means the opening break is next. */
  shots = 0;
  message = BREAK_MESSAGE;
  /** Ball in hand: where the player to shoot may place the cue ball. */
  place: Placement = "kitchen";
  /** Pots since the renderer last drained this queue. */
  potEvents: PotEvent[] = [];

  constructor(cfg: TableConfig, rng: Rng = Math.random) {
    this.cfg = cfg;
    this.rng = rng;
    this.pockets = pocketsFor(cfg);
    this.rack();
  }

  private makeBall(n: number, u: number, v: number): Ball {
    const rnd = () => this.rng() - 0.5;
    const spin = normalise([rnd(), rnd(), 2.2]);
    const a = normalise(cross(spin, [rnd(), rnd(), rnd()]));
    const t1 = normalise([
      1 - spin[0] * spin[0],
      -spin[0] * spin[1],
      -spin[0] * spin[2],
    ]);
    return {
      n,
      u,
      v,
      du: 0,
      dv: 0,
      on: true,
      sink: null,
      o: { n: spin, a, t1 },
    };
  }

  /** Resets to a fresh break with the cue ball on the head string. */
  rack() {
    const { L, Wd, r } = this.cfg;
    const balls: Ball[] = [this.makeBall(0, L * HEAD_STRING, Wd / 2)];
    let k = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j <= i; j++) {
        const n = RACK_ORDER[k++];
        balls[n] = this.makeBall(
          n,
          L * FOOT_SPOT + i * r * 2 * 0.8661,
          Wd / 2 + (j - i / 2) * (r * 2 + RACK_GAP),
        );
      }
    }
    this.balls = balls;
    this.groups = { you: null, james: null };
    this.turn = "you";
    this.winner = null;
    this.moving = false;
    this.shot = null;
    this.shots = 0;
    this.message = BREAK_MESSAGE;
    this.place = "kitchen";
    this.potEvents = [];
  }

  get cue(): Ball {
    return this.balls[0];
  }

  /** Object balls still on the table belonging to a group (excludes the 8). */
  left(group: Group): Ball[] {
    return this.balls.filter(
      (b) => b.on && b.n !== 0 && b.n !== 8 && isOwn(group, b.n),
    );
  }

  /** Whether the player may currently line up a shot. */
  canAim(): boolean {
    return !this.moving && !this.winner && this.turn === "you" && this.cue.on;
  }

  /** Strikes the cue ball at `ang` radians with `power` from 0 to 1. */
  shoot(ang: number, power: number) {
    const c = this.cue;
    this.shots++;
    c.du = Math.cos(ang) * power * this.cfg.maxV;
    c.dv = Math.sin(ang) * power * this.cfg.maxV;
    const g = this.groups[this.turn];
    this.shot = {
      shooter: this.turn,
      firstHit: null,
      potted: [],
      scratch: false,
      clearedBefore: !!g && this.left(g).length === 0,
    };
    this.moving = true;
    this.place = null;
  }

  /** Whether the cue ball may rest at (u, v) under the current ball in hand. */
  cueSpotOk(u: number, v: number): boolean {
    const { L, Wd, r } = this.cfg;
    if (u < r || u > L - r || v < r || v > Wd - r) return false;
    if (this.place === "kitchen" && u > L * HEAD_STRING) return false;
    // Inside a pocket's capture circle the cue would be potted on the spot.
    if (this.pockets.some((p) => Math.hypot(p.u - u, p.v - v) < p.R)) {
      return false;
    }
    return this.balls.every(
      (b) =>
        !b.on ||
        b.n === 0 ||
        Math.hypot(b.u - u, b.v - v) >= r * PLACE_CLEARANCE,
    );
  }

  /** The furthest the cue ball may be placed along the long axis. */
  private placeMaxU(): number {
    const { L, r } = this.cfg;
    return this.place === "kitchen" ? L * HEAD_STRING : L - r;
  }

  /**
   * Moves the cue ball towards (u, v), clamped to the allowed area. Ignored if
   * the clamped spot overlaps another ball. Returns whether it moved.
   */
  placeCue(u: number, v: number): boolean {
    if (!this.place) return false;
    const { Wd, r } = this.cfg;
    const tu = Math.max(r, Math.min(this.placeMaxU(), u));
    const tv = Math.max(r, Math.min(Wd - r, v));
    if (!this.cueSpotOk(tu, tv)) return false;
    const c = this.cue;
    c.u = tu;
    c.v = tv;
    c.du = 0;
    c.dv = 0;
    return true;
  }

  /** Advance sink animations. Call once per frame whether or not moving. */
  tickSinks() {
    for (const b of this.balls) {
      if (b.sink) {
        b.sink.t += SINK_RATE;
        if (b.sink.t >= 1) b.sink = null;
      }
    }
  }

  /**
   * One frame of physics. Returns true when the shot resolved this frame
   * (turn, groups, message or winner may have changed).
   */
  step(): boolean {
    if (!this.moving) return false;
    const { L, Wd, r } = this.cfg;
    const live = this.balls.filter((b) => b.on);

    for (let s = 0; s < SUBSTEPS; s++) {
      for (const b of live) {
        if (!b.on) continue;
        b.u += b.du / SUBSTEPS;
        b.v += b.dv / SUBSTEPS;
      }

      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          const a = live[i];
          const b = live[j];
          if (!a.on || !b.on) continue;
          const du = b.u - a.u;
          const dv = b.v - a.v;
          const d = Math.hypot(du, dv);
          if (d >= r * 2 || d === 0) continue;
          const nu = du / d;
          const nv = dv / d;
          const ov = (r * 2 - d) / 2;
          a.u -= nu * ov;
          a.v -= nv * ov;
          b.u += nu * ov;
          b.v += nv * ov;
          const rel = (a.du - b.du) * nu + (a.dv - b.dv) * nv;
          if (rel > 0) {
            const k = rel * 0.97;
            a.du -= k * nu;
            a.dv -= k * nv;
            b.du += k * nu;
            b.dv += k * nv;
          }
          if (
            this.shot &&
            this.shot.firstHit == null &&
            (a.n === 0 || b.n === 0)
          ) {
            this.shot.firstHit = a.n === 0 ? b.n : a.n;
          }
        }
      }

      for (const b of live) {
        if (!b.on) continue;
        const cm = r * 1.6;
        const sm = r * 1.3;
        const inMouthU = b.u < cm || b.u > L - cm || Math.abs(b.u - L / 2) < sm;
        const inMouthV = b.v < cm || b.v > Wd - cm;
        if (!inMouthU) {
          if (b.v < r) {
            b.v = r;
            b.dv = Math.abs(b.dv) * 0.8;
          }
          if (b.v > Wd - r) {
            b.v = Wd - r;
            b.dv = -Math.abs(b.dv) * 0.8;
          }
        }
        if (!inMouthV) {
          if (b.u < r) {
            b.u = r;
            b.du = Math.abs(b.du) * 0.8;
          }
          if (b.u > L - r) {
            b.u = L - r;
            b.du = -Math.abs(b.du) * 0.8;
          }
        }
        let pk = this.pockets.find(
          (p) => Math.hypot(b.u - p.u, b.v - p.v) < p.R,
        );
        if (
          !pk &&
          (b.u < -r * 2 || b.u > L + r * 2 || b.v < -r * 2 || b.v > Wd + r * 2)
        ) {
          pk = this.pockets.reduce((m, p) =>
            Math.hypot(b.u - p.u, b.v - p.v) < Math.hypot(b.u - m.u, b.v - m.v)
              ? p
              : m,
          );
        }
        if (pk) {
          b.on = false;
          const pocket = this.pockets.indexOf(pk);
          b.sink = {
            t: 0,
            pocket,
            R: pk.R,
            u0: b.u,
            v0: b.v,
            pu: pk.u,
            pv: pk.v,
          };
          b.du = 0;
          b.dv = 0;
          this.potEvents.push({ n: b.n, pocket, scratch: b.n === 0 });
          if (this.shot) {
            if (b.n === 0) this.shot.scratch = true;
            else this.shot.potted.push(b.n);
          }
        }
      }
    }

    let still = true;
    for (const b of live) {
      if (!b.on) continue;
      b.du *= 0.986;
      b.dv *= 0.986;
      if (Math.hypot(b.du, b.dv) < 0.03) {
        b.du = 0;
        b.dv = 0;
      } else {
        still = false;
      }
    }
    if (this.balls.some((b) => b.sink)) still = false;
    if (still) {
      this.resolve();
      return true;
    }
    return false;
  }

  /** Applies the rules to the finished shot: fouls, groups, turn and win. */
  resolve() {
    this.moving = false;
    const sh = this.shot;
    this.shot = null;
    if (!sh) return;

    const me = sh.shooter;
    const other: Player = me === "you" ? "james" : "you";
    let g = this.groups[me];

    if (sh.potted.includes(8)) {
      const won = !!g && sh.clearedBefore && !sh.scratch;
      this.winner = won ? me : other;
      this.message =
        this.winner === "you"
          ? won
            ? "You sank the 8. You win."
            : "James potted the 8 too early. You win."
          : won
            ? "James sank the 8. James wins."
            : "You potted the 8 too early. James wins.";
      if (sh.scratch) this.cue.on = true;
      return;
    }

    let reason: string | null = null;
    if (sh.scratch) reason = "cue ball potted";
    else if (sh.firstHit == null) reason = "no ball hit";
    else if (g && sh.clearedBefore && sh.firstHit !== 8)
      reason = "had to hit the 8 first";
    else if (g && !sh.clearedBefore && !isOwn(g, sh.firstHit))
      reason = "wrong ball hit first";
    else if (!g && sh.firstHit === 8) reason = "hit the 8 first";

    let note = "";
    if (!g && !reason) {
      const first = sh.potted.find((n) => n !== 8);
      if (first) {
        g = first < 8 ? "solids" : "stripes";
        this.groups[me] = g;
        this.groups[other] = g === "solids" ? "stripes" : "solids";
        note = me === "you" ? `You're ${g}. ` : `James takes ${g}. `;
      }
    }

    const keep = !reason && !!g && sh.potted.some((n) => isOwn(g!, n));
    if (!keep) this.turn = other;

    if (sh.scratch) this.respotCue();

    // A foul gives the other player (who now has the turn) ball in hand.
    this.place = reason ? "anywhere" : null;
    let next: string;
    if (reason) {
      next =
        this.turn === "you"
          ? "Ball in hand: drag the white anywhere, then shoot."
          : "James has ball in hand.";
    } else {
      next = this.turn === "you" ? "Your shot." : "James is lining up a shot.";
    }
    this.message =
      (reason ? `Foul: ${reason}. ` : "") +
      note +
      (keep
        ? me === "you"
          ? "Nice. Shoot again."
          : "James goes again."
        : next);
  }

  /** Puts the cue ball back on the head string, nudged clear of other balls. */
  private respotCue() {
    const { L, Wd, r } = this.cfg;
    const c = this.cue;
    c.on = true;
    c.sink = null;
    c.du = 0;
    c.dv = 0;
    c.u = L * HEAD_STRING;
    c.v = Wd / 2;
    for (
      let k = 0;
      k < 20 &&
      this.balls.some(
        (b) => b.n && b.on && Math.hypot(b.u - c.u, b.v - c.v) < r * 2.1,
      );
      k++
    ) {
      c.v += (k % 2 ? -1 : 1) * r * 2.2 * (k + 1);
    }
  }

  /** Cast the cue ball along `ang` to its first contact (ball or cushion). */
  ray(c: Ball, ang: number): RayResult {
    const { L, Wd, r } = this.cfg;
    const du = Math.cos(ang);
    const dv = Math.sin(ang);
    let best = Infinity;
    let hit: Ball | null = null;
    for (const b of this.balls) {
      if (!b.on || b.n === 0) continue;
      const wu = c.u - b.u;
      const wv = c.v - b.v;
      const bq = wu * du + wv * dv;
      const cq = wu * wu + wv * wv - 4 * r * r;
      const disc = bq * bq - cq;
      if (disc > 0) {
        const t = -bq - Math.sqrt(disc);
        if (t > 0 && t < best) {
          best = t;
          hit = b;
        }
      }
    }
    const tw = Math.min(
      du > 0 ? (L - r - c.u) / du : du < 0 ? (r - c.u) / du : Infinity,
      dv > 0 ? (Wd - r - c.v) / dv : dv < 0 ? (r - c.v) / dv : Infinity,
    );
    if (tw < best) {
      best = tw;
      hit = null;
    }
    return {
      t: Math.max(0, best),
      hit,
      gu: c.u + du * best,
      gv: c.v + dv * best,
    };
  }

  /** Balls James is allowed to hit first: his group, then the 8 once they are cleared. */
  private opponentTargets(): Ball[] {
    const g = this.groups.james;
    let targets = g
      ? this.left(g)
      : this.balls.filter((b) => b.on && b.n !== 0 && b.n !== 8);
    if (g && !targets.length) targets = [this.balls[8]].filter((b) => b.on);
    return targets;
  }

  /**
   * The best ghost-ball shot at a pocket for a cue ball resting at `origin`,
   * or null if no clear cut exists. Lower scores are better.
   */
  bestShot(origin: { u: number; v: number }): ScoredShot | null {
    const { L, r } = this.cfg;
    const clear = (
      au: number,
      av: number,
      bu: number,
      bv: number,
      skip: Ball,
    ) =>
      this.balls.every((o) => {
        if (!o.on || o === skip || o.n === 0) return true;
        const du = bu - au;
        const dv = bv - av;
        const l2 = du * du + dv * dv || 1;
        const t = Math.max(
          0,
          Math.min(1, ((o.u - au) * du + (o.v - av) * dv) / l2),
        );
        return Math.hypot(au + du * t - o.u, av + dv * t - o.v) > r * 2;
      });

    let best: ScoredShot | null = null;
    for (const t of this.opponentTargets()) {
      for (const p of this.pockets) {
        const pu = p.u - t.u;
        const pv = p.v - t.v;
        const pl = Math.hypot(pu, pv);
        const nu = pu / pl;
        const nv = pv / pl;
        const gu = t.u - nu * r * 2;
        const gv = t.v - nv * r * 2;
        const au = gu - origin.u;
        const av = gv - origin.v;
        const al = Math.hypot(au, av);
        if (al < r) continue;
        const cos = (au * nu + av * nv) / al;
        if (cos < 0.35) continue;
        if (
          !clear(origin.u, origin.v, gu, gv, t) ||
          !clear(t.u, t.v, p.u, p.v, t)
        )
          continue;
        const score = (1 - cos) * 3 + al / L + pl / L;
        if (!best || score < best.score) {
          best = {
            score,
            ang: Math.atan2(av, au),
            power: Math.min(0.92, 0.3 + (al + pl * 1.4) / (L * 1.25)),
          };
        }
      }
    }
    return best;
  }

  /**
   * Where James puts the cue ball with ball in hand: the legal spot on a
   * 17 by 9 grid with the best shot, or where it already is if none has one.
   */
  pickPlacement(): { u: number; v: number } {
    const { Wd, r } = this.cfg;
    const c = this.cue;
    const uMax = this.placeMaxU();
    let best: { u: number; v: number; score: number } | null = null;
    for (let i = 0; i < PLACE_GRID_U; i++) {
      for (let j = 0; j < PLACE_GRID_V; j++) {
        const u = r + ((uMax - r) * i) / (PLACE_GRID_U - 1);
        const v = r + ((Wd - 2 * r) * j) / (PLACE_GRID_V - 1);
        if (!this.cueSpotOk(u, v)) continue;
        const shot = this.bestShot({ u, v });
        if (shot && (!best || shot.score < best.score)) {
          best = { u, v, score: shot.score };
        }
      }
    }
    return best ? { u: best.u, v: best.v } : { u: c.u, v: c.v };
  }

  /**
   * Choose an aim angle and power for James, as if the cue ball rested at
   * `origin` (default: where it is). Does not mutate game state.
   */
  planOpponentShot(
    currentAim: number,
    origin: { u: number; v: number } = this.cue,
  ): OpponentPlan {
    let plan: OpponentPlan;
    const best = this.bestShot(origin);
    if (best) {
      plan = { ang: best.ang, power: best.power };
    } else {
      const t = [...this.opponentTargets()].sort(
        (a, b) =>
          Math.hypot(a.u - origin.u, a.v - origin.v) -
          Math.hypot(b.u - origin.u, b.v - origin.v),
      )[0];
      plan = t
        ? { ang: Math.atan2(t.v - origin.v, t.u - origin.u), power: 0.6 }
        : { ang: 0, power: 0.5 };
    }

    const err = (this.rng() + this.rng() - 1) * 0.045;
    const isBreak = this.shots === 0;
    if (isBreak) {
      plan = {
        ang: Math.atan2(this.balls[1].v - origin.v, this.balls[1].u - origin.u),
        power: 0.95,
      };
    }
    // Unwrap so the aim sweeps the short way round from where it is now.
    let to = plan.ang + err;
    while (to - currentAim > Math.PI) to -= Math.PI * 2;
    while (to - currentAim < -Math.PI) to += Math.PI * 2;
    return { ang: to, power: plan.power };
  }
}

/**
 * Rotates a ball's orientation for a rolled distance (dx, dy) in px, using
 * Rodrigues' formula about the axis perpendicular to the movement.
 *
 * @param rng Occasionally triggers a re-normalise to cancel numeric drift.
 */
export function roll(b: Ball, dx: number, dy: number, r: number, rng: Rng) {
  const d = Math.hypot(dx, dy);
  if (d < 1e-3) return;
  const kx = -dy / d;
  const ky = dx / d;
  const th = d / r;
  const c = Math.cos(th);
  const sn = Math.sin(th);
  const rot = (v: Vec3): Vec3 => {
    const kv = kx * v[0] + ky * v[1];
    return [
      v[0] * c + ky * v[2] * sn + kx * kv * (1 - c),
      v[1] * c - kx * v[2] * sn + ky * kv * (1 - c),
      v[2] * c + (kx * v[1] - ky * v[0]) * sn,
    ];
  };
  const o = b.o;
  o.n = rot(o.n);
  o.a = rot(o.a);
  o.t1 = rot(o.t1);
  if (rng() < 0.05) {
    o.n = normalise(o.n);
    o.a = normalise(o.a);
    o.t1 = normalise(o.t1);
  }
}
