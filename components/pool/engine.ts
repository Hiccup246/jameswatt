// Pure 8-ball pool engine. No DOM, no React. Positions are in table space:
// u runs along the long side (0..L), v across it (0..Wd). The renderer maps
// (u, v) to screen coordinates, which lets one engine serve both the
// landscape (desktop) and portrait (mobile) tables.

export type Player = "you" | "james";
export type Group = "solids" | "stripes";
export type Vec3 = [number, number, number];

export interface TableConfig {
  L: number;
  Wd: number;
  r: number;
  maxV: number;
}

export interface Orientation {
  n: Vec3;
  a: Vec3;
  t1: Vec3;
}

export interface Sink {
  t: number;
  u0: number;
  v0: number;
  pu: number;
  pv: number;
}

export interface Ball {
  n: number;
  u: number;
  v: number;
  du: number;
  dv: number;
  on: boolean;
  sink: Sink | null;
  o: Orientation;
}

export interface Pocket {
  u: number;
  v: number;
  R: number;
}

export interface Shot {
  shooter: Player;
  firstHit: number | null;
  potted: number[];
  scratch: boolean;
  clearedBefore: boolean;
}

export interface RayResult {
  t: number;
  hit: Ball | null;
  gu: number;
  gv: number;
}

export interface AiPlan {
  ang: number;
  power: number;
}

export const RACK_ORDER = [1, 9, 2, 10, 8, 3, 11, 7, 14, 4, 5, 13, 15, 6, 12];
export const SUBSTEPS = 8;
export const BREAK_MESSAGE =
  "Your break. Aim with the cursor, then press and drag to set power.";

export type Rng = () => number;

const normalise = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

export function tableConfig(mobile: boolean): TableConfig {
  return mobile
    ? { L: 580, Wd: 300, r: 9, maxV: 17 }
    : { L: 960, Wd: 480, r: 12, maxV: 26 };
}

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

export function isOwn(group: Group, n: number): boolean {
  return group === "solids" ? n > 0 && n < 8 : n > 8;
}

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
  message = BREAK_MESSAGE;

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

  rack() {
    const { L, Wd, r } = this.cfg;
    const balls: Ball[] = [this.makeBall(0, L * 0.25, Wd / 2)];
    let k = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j <= i; j++) {
        const n = RACK_ORDER[k++];
        balls[n] = this.makeBall(
          n,
          L * 0.73 + i * r * 2 * 0.8661 + i * 0.3,
          Wd / 2 + (j - i / 2) * (r * 2 + 0.4),
        );
      }
    }
    this.balls = balls;
    this.groups = { you: null, james: null };
    this.turn = "you";
    this.winner = null;
    this.moving = false;
    this.shot = null;
    this.message = BREAK_MESSAGE;
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

  canAim(): boolean {
    return !this.moving && !this.winner && this.turn === "you" && this.cue.on;
  }

  shoot(ang: number, power: number) {
    const c = this.cue;
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
  }

  /** Advance sink animations. Call once per frame whether or not moving. */
  tickSinks() {
    for (const b of this.balls) {
      if (b.sink) {
        b.sink.t += 0.1;
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
          b.sink = { t: 0, u0: b.u, v0: b.v, pu: pk.u, pv: pk.v };
          b.du = 0;
          b.dv = 0;
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

    const next =
      this.turn === "you" ? "Your shot." : "James is lining up a shot.";
    this.message =
      (reason ? `Foul: ${reason}. ` : "") +
      note +
      (keep
        ? me === "you"
          ? "Nice. Shoot again."
          : "James goes again."
        : next);
  }

  private respotCue() {
    const { L, Wd, r } = this.cfg;
    const c = this.cue;
    c.on = true;
    c.sink = null;
    c.du = 0;
    c.dv = 0;
    c.u = L * 0.25;
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

  /** Choose an aim angle and power for James. Does not mutate game state. */
  planAi(currentAim: number): AiPlan {
    const { L, r } = this.cfg;
    const c = this.cue;
    const g = this.groups.james;
    let targets = g
      ? this.left(g)
      : this.balls.filter((b) => b.on && b.n !== 0 && b.n !== 8);
    if (g && !targets.length) targets = [this.balls[8]].filter((b) => b.on);

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

    let best: (AiPlan & { score: number }) | null = null;
    for (const t of targets) {
      for (const p of this.pockets) {
        const pu = p.u - t.u;
        const pv = p.v - t.v;
        const pl = Math.hypot(pu, pv);
        const nu = pu / pl;
        const nv = pv / pl;
        const gu = t.u - nu * r * 2;
        const gv = t.v - nv * r * 2;
        const au = gu - c.u;
        const av = gv - c.v;
        const al = Math.hypot(au, av);
        const cos = (au * nu + av * nv) / al;
        if (cos < 0.35) continue;
        if (!clear(c.u, c.v, gu, gv, t) || !clear(t.u, t.v, p.u, p.v, t))
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

    let plan: AiPlan;
    if (best) {
      plan = { ang: best.ang, power: best.power };
    } else {
      const t = [...targets].sort(
        (a, b) =>
          Math.hypot(a.u - c.u, a.v - c.v) - Math.hypot(b.u - c.u, b.v - c.v),
      )[0];
      plan = t
        ? { ang: Math.atan2(t.v - c.v, t.u - c.u), power: 0.6 }
        : { ang: 0, power: 0.5 };
    }

    const err = (this.rng() + this.rng() - 1) * 0.045;
    const isBreak = this.balls.filter((b) => b.on).length === 16;
    if (isBreak) {
      plan = {
        ang: Math.atan2(this.balls[1].v - c.v, this.balls[1].u - c.u),
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

/** Rotate a ball's orientation vectors for a rolled distance (dx, dy) in px. */
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
