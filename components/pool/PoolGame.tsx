"use client";

/**
 * @file The playable pool table.
 *
 * Rendering strategy: React renders the static table (rails, felt, pockets,
 * balls) once. Per-frame positions are written straight to element styles from
 * a requestAnimationFrame loop, so the game never re-renders at 60fps. React
 * state is only bumped when a shot resolves, to refresh the status panel.
 *
 * Coordinates: the engine works in table space (u along the long side, v
 * across it). `map` converts to screen space, swapping axes on the portrait
 * (mobile) table. Pointer positions are converted back through the same map and
 * the scale applied by PoolHero.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import JamesWattImage from "../../public/panthy-tiny.webp";
import {
  FOOT_SPOT,
  HEAD_STRING,
  PoolEngine,
  SINK_FADE_START,
  SINK_FALL_START,
  SINK_ROLL_END,
  roll,
  tableConfig,
  type PotEvent,
} from "./engine";
import { capTransform, discTransform } from "./ballPaint";
import {
  cushionSegments,
  guideLines,
  tableLayout,
  type Line,
} from "./geometry";
import StatusPanel from "./StatusPanel";
import {
  BALL_COLORS,
  BALL_HIGHLIGHT,
  BALL_SHADOW,
  CUE_SHADOW,
  GUIDE_SHADOW,
  HOLE_OVERLAY_SHADOW,
  IVORY,
  SCRATCH_RING,
  paletteFor,
} from "./theme";

interface Props {
  open: boolean;
  /** Portrait table when true, landscape when false. */
  mobile: boolean;
  dark: boolean;
  reduced: boolean;
  /** Element below the table that the status panel is portalled into. */
  statusHost: HTMLElement | null;
  /** Called once the (closed) board has mounted, so the open transition can run. */
  onReady: () => void;
  /** Called when the player ends the game, so the table collapses to the coin. */
  onEnd: () => void;
}

/** The cue striking forward: `pull` runs from the drawn-back power down past zero. */
interface Strike {
  ang: number;
  power: number;
  pull: number;
}

/** A position in table space. */
type Point = { u: number; v: number };

/** James's turn, timed from `t0`. */
interface AiTurn {
  from: number;
  to: number;
  power: number;
  t0: number;
}

// James takes about five seconds per turn. Times are ms since his turn began.
const AI_SWAY_END = 1400;
const AI_AIM_END = 3100;
const AI_PULL_START = 3300;
const AI_PULL_END = 4700;
const AI_STRIKE = 4850;
/** Idle sway amplitude in radians while James "thinks". */
const AI_SWAY = 0.06;

/** Drag distance for full power, as a fraction of the table length. */
const FULL_POWER_DRAG = 0.28;
/** How far the cue draws back at full power, as a fraction of the table length. */
const MAX_PULL_BACK = 0.12;
/** Releasing with less power than this cancels the shot. */
const MIN_POWER = 0.03;
/** Keyboard aim step per key press (radians), and with Shift held. */
const KEY_AIM_STEP = 0.03;
const KEY_AIM_STEP_FAST = 0.12;
/** Power gained per frame while the keyboard charge key is held. */
const KEY_CHARGE_RATE = 0.012;

const ZERO_LINE: Line = { u1: 0, v1: 0, u2: 0, v2: 0 };

/** Writes numeric attributes onto an SVG element. */
const setAttrs = (el: SVGElement | null, attrs: Record<string, number>) => {
  if (!el) return;
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
};

/** Keys that hold to charge power and release to shoot. */
const CHARGE_KEYS = [" ", "Enter"];

export default function PoolGame({
  open,
  mobile,
  dark,
  reduced,
  statusHost,
  onReady,
  onEnd,
}: Props) {
  const cfg = useMemo(() => tableConfig(mobile), [mobile]);
  const { L, Wd, r } = cfg;
  const horiz = !mobile;
  const {
    rail,
    railRadius,
    coinDiameter: D,
    cueThickness: cueH,
  } = tableLayout(mobile);
  // Felt size on screen, and the whole board including rails.
  const SW = horiz ? L : Wd;
  const SH = horiz ? Wd : L;
  const TW = SW + rail * 2;
  const TH = SH + rail * 2;
  const pal = paletteFor(dark);

  const engineRef = useRef<PoolEngine | null>(null);
  if (!engineRef.current) engineRef.current = new PoolEngine(cfg);
  const engine = engineRef.current;

  // Bumped on game events (shot resolved, re-rack) so React-rendered UI refreshes.
  const [, setVersion] = useState(0);
  const bump = () => setVersion((v) => v + 1);

  // DOM handles that the frame loop writes to directly.
  const surfRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<SVGGElement>(null);
  const g1Ref = useRef<SVGLineElement>(null);
  const g2Ref = useRef<SVGLineElement>(null);
  const g3Ref = useRef<SVGLineElement>(null);
  const ghostRef = useRef<SVGCircleElement>(null);
  const ballEls = useRef<(HTMLDivElement | null)[]>([]);
  const capAEls = useRef<(HTMLDivElement | null)[]>([]);
  const capBEls = useRef<(HTMLDivElement | null)[]>([]);
  const discEls = useRef<(HTMLDivElement | null)[]>([]);
  const holeEls = useRef<(HTMLDivElement | null)[]>([]);
  const wellEls = useRef<(HTMLDivElement | null)[]>([]);
  const ringEls = useRef<(HTMLDivElement | null)[]>([]);
  // Falling copies of potted balls, living inside each pocket's well.
  const clones = useRef(new Map<number, HTMLDivElement>());
  const reducedRef = useRef(reduced);

  // Controller state: lives in refs, never triggers renders.
  const aim = useRef(0);
  /** Last known pointer position, null until the pointer moves over the page. */
  const ptr = useRef<Point | null>(null);
  /** Where the press that started a power drag landed. */
  const pull = useRef<Point | null>(null);
  /** Whether the keyboard charge key is held. */
  const keyCharge = useRef(false);
  /** Power from 0 to 1, drawn as how far the cue is pulled back. */
  const pullAmt = useRef(0);
  const strike = useRef<Strike | null>(null);
  const aiTurn = useRef<AiTurn | null>(null);
  const prevPos = useRef<({ x: number; y: number } | null)[]>([]);

  /** Table space to screen space. */
  const map = (u: number, v: number): [number, number] =>
    horiz ? [u, v] : [v, u];

  /** Client coordinates to table space, undoing the board scale. */
  const toTable = (e: { clientX: number; clientY: number }): Point | null => {
    const s = surfRef.current;
    if (!s) return null;
    const rect = s.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * SW) / rect.width;
    const y = ((e.clientY - rect.top) * SH) / rect.height;
    return horiz ? { u: x, v: y } : { u: y, v: x };
  };

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const removeClone = (n: number) => {
    const el = clones.current.get(n);
    if (!el) return;
    el.remove();
    clones.current.delete(n);
  };
  const clearClones = () => {
    for (const n of [...clones.current.keys()]) removeClone(n);
  };

  /** Drops any drag, aim, pull, strike or AI plan that is in flight. */
  const cancelInteraction = () => {
    pull.current = null;
    keyCharge.current = false;
    pullAmt.current = 0;
    strike.current = null;
    aiTurn.current = null;
  };

  /** Re-racks and clears every in-flight interaction. */
  const newGame = () => {
    engine.rack();
    clearClones();
    aim.current = 0;
    cancelInteraction();
    prevPos.current = [];
    bump();
  };

  useEffect(() => {
    onReady();
    // Only on mount: PoolHero remounts this component when the orientation changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-rack whenever the table is opened, and hand keyboard focus to the felt.
  useEffect(() => {
    if (!open) {
      // Ending the game collapses the table: stop everything in flight.
      cancelInteraction();
      return;
    }
    newGame();
    surfRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Pointer tracking is on window so aiming and releasing work off the table.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current = toTable(e);
    };
    const release = (shoot: boolean) => {
      if (!pull.current) return;
      const p = pullAmt.current;
      pull.current = null;
      if (shoot && p > MIN_POWER) {
        strike.current = { ang: aim.current, power: p, pull: p };
      } else {
        pullAmt.current = 0;
      }
    };
    const onUp = () => release(true);
    const onCancel = () => release(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SW, SH, horiz]);

  /** Pressing the felt locks the aim and starts the power drag. */
  const onSurfaceDown = (e: React.PointerEvent) => {
    ptr.current = toTable(e);
    if (!ptr.current || !engine.canAim() || strike.current) return;
    const cb = engine.cue;
    aim.current = Math.atan2(ptr.current.v - cb.v, ptr.current.u - cb.u);
    pull.current = { ...ptr.current };
    pullAmt.current = 0;
  };

  // Keyboard alternative to the pointer: arrows aim, hold Space or Enter to
  // charge power, release to shoot. Left and right turn the cue clockwise or
  // anticlockwise on screen, which flips sign on the portrait table.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!engine.canAim() || strike.current) return;
    const turn = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      e.key
    ];
    if (turn) {
      e.preventDefault();
      const step = e.shiftKey ? KEY_AIM_STEP_FAST : KEY_AIM_STEP;
      aim.current += turn * step * (horiz ? 1 : -1);
      // Stop the idle pointer from snapping the aim back.
      ptr.current = null;
    } else if (CHARGE_KEYS.includes(e.key)) {
      e.preventDefault();
      if (!e.repeat && !pull.current) {
        keyCharge.current = true;
        pullAmt.current = 0;
      }
    }
  };

  const releaseKeyCharge = (shoot: boolean) => {
    if (!keyCharge.current) return;
    keyCharge.current = false;
    const p = pullAmt.current;
    if (shoot && p > MIN_POWER) {
      strike.current = { ang: aim.current, power: p, pull: p };
    } else {
      pullAmt.current = 0;
    }
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (CHARGE_KEYS.includes(e.key)) releaseKeyCharge(true);
  };

  // The frame loop. Runs only while the table is open.
  useEffect(() => {
    if (!open) return;
    let raf = 0;

    /** Applies the rolled orientation of ball `n` to its number and stripes. */
    const paintBall = (n: number, o: PoolEngine["balls"][number]["o"]) => {
      const setCap = (el: HTMLDivElement | null, pole: typeof o.a) => {
        if (!el) return;
        const t = capTransform(pole, r);
        el.style.opacity = t ? "1" : "0";
        if (t) el.style.transform = t;
      };
      setCap(capAEls.current[n], o.a);
      setCap(capBEls.current[n], [-o.a[0], -o.a[1], -o.a[2]]);
      const disc = discEls.current[n];
      if (disc) {
        const t = discTransform(o, r);
        disc.style.opacity = t ? "1" : "0";
        if (t) disc.style.transform = t;
      }
    };

    // A copy of the ball goes into the pocket's well so only the part inside
    // the hole shows. It lines up with the on-felt ball, which slips under the
    // hole layer as it rolls in.
    const startSink = (ev: PotEvent) => {
      const src = ballEls.current[ev.n];
      const well = wellEls.current[ev.pocket];
      if (!src || !well) return;
      removeClone(ev.n);
      const copy = src.cloneNode(true) as HTMLDivElement;
      copy.style.transition = "none";
      copy.style.opacity = "1";
      copy.style.visibility = "visible";
      well.appendChild(copy);
      clones.current.set(ev.n, copy);
    };

    // The pocket pulses and a ring ripples out; the ring is red for a scratch.
    const pocketFx = (ev: PotEvent) => {
      const hole = holeEls.current[ev.pocket];
      const ring = ringEls.current[ev.pocket];
      if (hole?.animate) {
        hole.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.14)", offset: 0.35 },
            { transform: "scale(1)" },
          ],
          { duration: 320, delay: 160, easing: "ease-out" },
        );
      }
      if (ring?.animate) {
        const colour = ev.scratch ? { borderColor: SCRATCH_RING } : {};
        ring.animate(
          [
            { transform: "scale(.9)", opacity: 0, ...colour },
            { transform: "scale(1)", opacity: 0.95, offset: 0.25, ...colour },
            { transform: "scale(1.9)", opacity: 0, ...colour },
          ],
          { duration: 650, delay: 180, easing: "cubic-bezier(.2,.7,.3,1)" },
        );
      }
    };

    /** Advances physics and spawns sink effects for balls potted this frame. */
    const stepPhysics = () => {
      if (engine.moving && engine.step()) bump();
      for (const ev of engine.potEvents.splice(0)) {
        if (reducedRef.current) continue;
        startSink(ev);
        pocketFx(ev);
      }
      engine.tickSinks();
    };

    /** Plays the cue's forward strike, then fires the shot. */
    const stepStrike = (s: Strike) => {
      s.pull -= 0.22;
      pullAmt.current = Math.max(0, s.pull);
      if (s.pull <= -0.05) {
        strike.current = null;
        engine.shoot(s.ang, s.power);
        pullAmt.current = 0;
      }
    };

    /** Aim and power from the pointer or keyboard on the player's turn. */
    const stepPlayerInput = () => {
      const cb = engine.cue;
      if (ptr.current && !pull.current && !keyCharge.current) {
        aim.current = Math.atan2(ptr.current.v - cb.v, ptr.current.u - cb.u);
      }
      if (pull.current && ptr.current) {
        pullAmt.current = Math.min(
          1,
          Math.hypot(
            ptr.current.u - pull.current.u,
            ptr.current.v - pull.current.v,
          ) /
            (L * FULL_POWER_DRAG),
        );
      }
      if (keyCharge.current) {
        pullAmt.current = Math.min(1, pullAmt.current + KEY_CHARGE_RATE);
      }
    };

    /** James: idle sway, ease the aim round, draw the cue back, strike. */
    const stepAi = () => {
      if (!aiTurn.current) {
        const plan = engine.planAi(aim.current);
        aiTurn.current = {
          from: aim.current,
          to: plan.ang,
          power: plan.power,
          t0: performance.now(),
        };
      }
      const a = aiTurn.current;
      const el = performance.now() - a.t0;
      // Ease-in-out between the starting aim and the chosen angle.
      const k = Math.max(
        0,
        Math.min(1, (el - AI_SWAY_END) / (AI_AIM_END - AI_SWAY_END)),
      );
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const sway =
        el < AI_SWAY_END
          ? Math.sin(el / 260) * AI_SWAY * (el / AI_SWAY_END)
          : 0;
      aim.current = a.from + (a.to - a.from) * e + sway;
      if (el > AI_PULL_START) {
        pullAmt.current = Math.min(
          a.power,
          ((el - AI_PULL_START) / (AI_PULL_END - AI_PULL_START)) * a.power,
        );
      }
      if (el > AI_STRIKE) {
        strike.current = { ang: a.to, power: a.power, pull: a.power };
        aiTurn.current = null;
      }
    };

    /** Positions every ball, its falling copy if potted, and its markings. */
    const paintBalls = () => {
      for (const b of engine.balls) {
        const el = ballEls.current[b.n];
        if (!el) continue;
        if (b.sink) {
          // Roll to the pocket centre, then only the copy in the hole shows
          // while it falls.
          const sk = b.sink;
          const t = sk.t;
          const m = Math.min(1, t / SINK_ROLL_END);
          const k = 1 - Math.pow(1 - m, 2);
          const [x, y] = map(
            sk.u0 + (sk.pu - sk.u0) * k,
            sk.v0 + (sk.pv - sk.v0) * k,
          );
          const [pcx, pcy] = map(sk.pu, sk.pv);
          const rolling = t < SINK_ROLL_END && !reducedRef.current;
          const prev = prevPos.current[b.n];
          if (rolling && prev) roll(b, x - prev.x, y - prev.y, r, Math.random);
          prevPos.current[b.n] = { x, y };
          el.style.transform = `translate(${x - r}px,${y - r}px)`;
          el.style.visibility = rolling ? "visible" : "hidden";

          const copy = clones.current.get(b.n);
          if (copy) {
            const fall = Math.max(
              0,
              (t - SINK_FALL_START) / (1 - SINK_FALL_START),
            );
            const f2 = fall * fall;
            // Drift away from the table centre to suggest depth.
            const [ox, oy] = map(
              sk.pu > L / 2 ? 1 : sk.pu < L / 2 ? -1 : 0,
              sk.pv > Wd / 2 ? 1 : -1,
            );
            const lx = x - pcx + sk.R - r + ox * f2 * r * 0.35;
            const ly = y - pcy + sk.R - r + oy * f2 * r * 0.35;
            copy.style.transform = `translate(${lx}px,${ly}px) scale(${1 - f2 * 0.6})`;
            copy.style.filter = `brightness(${1 - fall * 0.85})`;
            copy.style.opacity = String(
              1 - Math.max(0, (t - SINK_FADE_START) / (1 - SINK_FADE_START)),
            );
          }
        } else if (b.on) {
          removeClone(b.n);
          const [x, y] = map(b.u, b.v);
          const prev = prevPos.current[b.n];
          if (prev) roll(b, x - prev.x, y - prev.y, r, Math.random);
          prevPos.current[b.n] = { x, y };
          el.style.transform = `translate(${x - r}px,${y - r}px)`;
          el.style.visibility = "visible";
        } else {
          removeClone(b.n);
          el.style.visibility = "hidden";
          prevPos.current[b.n] = null;
        }
        paintBall(b.n, b.o);
      }
    };

    /** Positions the cue behind the cue ball, drawn back by the current power. */
    const paintCue = (visible: boolean) => {
      const cue = cueRef.current;
      if (!cue) return;
      cue.style.opacity = visible ? "1" : "0";
      if (!visible) return;
      const cb = engine.cue;
      const [cx, cy] = map(cb.u, cb.v);
      const [dx, dy] = map(Math.cos(aim.current), Math.sin(aim.current));
      const back = r + 4 + pullAmt.current * L * MAX_PULL_BACK;
      const px = cx - dx * back;
      const py = cy - dy * back;
      const a = Math.atan2(-dy, -dx);
      cue.style.transform = `translate(${px}px,${py - cueH / 2}px) rotate(${a}rad)`;
    };

    /** Draws the aim line, ghost ball and the two deflection lines. */
    const paintGuides = (visible: boolean) => {
      const guide = guideRef.current;
      if (!guide) return;
      guide.style.opacity = visible ? "1" : "0";
      if (!visible) return;
      const cb = engine.cue;
      const hit = engine.ray(cb, aim.current);
      const lines = guideLines(cb, hit, aim.current, L);
      const place = (el: SVGLineElement | null, line: Line | null) => {
        const l = line ?? ZERO_LINE;
        const [x1, y1] = map(l.u1, l.v1);
        const [x2, y2] = map(l.u2, l.v2);
        setAttrs(el, { x1, y1, x2, y2 });
      };
      place(g1Ref.current, lines.aim);
      place(g2Ref.current, lines.object);
      place(g3Ref.current, lines.deflect);
      const [gx, gy] = map(hit.gu, hit.gv);
      setAttrs(ghostRef.current, { cx: gx, cy: gy });
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      stepPhysics();

      if (strike.current) {
        stepStrike(strike.current);
      } else if (engine.canAim()) {
        stepPlayerInput();
      } else if (
        !engine.moving &&
        !engine.winner &&
        engine.turn === "james" &&
        engine.cue.on
      ) {
        stepAi();
      }

      paintBalls();
      const showCue = engine.cue.on && !engine.moving && !engine.winner;
      paintCue(showCue);
      paintGuides(showCue && engine.turn === "you" && !strike.current);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // The loop reads everything else through refs and the engine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const pockets = engine.pockets.map((p) => {
    const [x, y] = map(p.u, p.v);
    return { x: rail + x, y: rail + y, d: p.R * 2 };
  });
  const cushions = cushionSegments(cfg, horiz, rail);

  const diamonds: { x: number; y: number }[] = [];
  [1, 2, 3, 5, 6, 7].forEach((k) => {
    for (const v of [-rail / 2, Wd + rail / 2]) {
      const [x, y] = map((L * k) / 8, v);
      diamonds.push({ x: rail + x, y: rail + y });
    }
  });
  [1, 2, 3].forEach((k) => {
    for (const u of [-rail / 2, L + rail / 2]) {
      const [x, y] = map(u, (Wd * k) / 4);
      diamonds.push({ x: rail + x, y: rail + y });
    }
  });

  // Head string at a quarter of the table, foot spot at the rack apex.
  const [hx, hy] = map(L * HEAD_STRING, 0);
  const [fx, fy] = map(L * FOOT_SPOT, Wd / 2);
  // The clip circle grows past the corners so the cue is never clipped.
  const clipOpen = Math.hypot(TW, TH) / 2 + L * 0.65;
  const clip = `circle(${open ? clipOpen : D / 2 - 1}px at 50% 50%)`;
  const boardTransition = reduced
    ? "none"
    : open
      ? "clip-path .8s cubic-bezier(.7,0,.2,1), opacity 0s"
      : "clip-path .45s cubic-bezier(.6,0,.9,.4), opacity 0s linear .45s";
  const piecesTransition = reduced
    ? "none"
    : open
      ? "opacity .35s ease .6s"
      : "opacity .15s ease";

  return (
    <>
      {open &&
        statusHost &&
        createPortal(
          <StatusPanel
            engine={engine}
            pal={pal}
            horizontal={horiz}
            maxWidth={TW}
            onPlayAgain={newGame}
            onEndGame={onEnd}
          />,
          statusHost,
        )}
      <div
        inert={!open}
        className={`absolute inset-0 ${open ? "" : "pointer-events-none"}`}
        style={{
          boxSizing: "border-box",
          borderRadius: railRadius,
          background: pal.railBg,
          boxShadow: pal.railShadow,
          clipPath: clip,
          opacity: open ? 1 : 0,
          transition: boardTransition,
        }}
      >
        {diamonds.map((d, i) => (
          <div
            key={i}
            className="absolute h-[6px] w-[6px] rounded-full"
            style={{
              left: d.x,
              top: d.y,
              margin: "-3px 0 0 -3px",
              background: pal.diamondBg,
            }}
          />
        ))}
        {pockets.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.d * 1.5,
              height: p.d * 1.5,
              margin: (-p.d * 1.5) / 2,
              background: pal.plateBg,
              boxShadow: pal.plateShadow,
            }}
          />
        ))}
        <svg
          width={TW}
          height={TH}
          className="pointer-events-none absolute top-0 left-0"
        >
          {cushions.map((c, i) => (
            <g key={i}>
              <polygon points={c.pts} fill={pal.cushionBg} />
              <polyline
                points={c.nose}
                fill="none"
                stroke={pal.noseInk}
                strokeWidth={1.5}
              />
            </g>
          ))}
        </svg>
        <div
          ref={surfRef}
          data-testid="pool-felt"
          role="application"
          aria-label="Pool table. Use the arrow keys to aim, hold space to set power and release to shoot."
          tabIndex={0}
          onPointerDown={onSurfaceDown}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={() => releaseKeyCharge(false)}
          className="absolute cursor-crosshair overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          style={{
            left: rail,
            top: rail,
            width: SW,
            height: SH,
            background: pal.feltBg,
            touchAction: "none",
          }}
        >
          <div
            className="absolute"
            style={{
              left: horiz ? hx - 1 : 0,
              top: horiz ? 0 : hy - 1,
              width: horiz ? 2 : SW,
              height: horiz ? SH : 2,
              background: pal.lineInk,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              left: fx,
              top: fy,
              width: 6,
              height: 6,
              margin: "-3px 0 0 -3px",
              background: pal.lineInk,
            }}
          />
          <div
            className="absolute box-border overflow-hidden rounded-full"
            style={{
              left: SW / 2 - D / 2,
              top: SH / 2 - D / 2,
              width: D,
              height: D,
              border: pal.photoBorder,
              boxShadow: pal.photoShadow,
              background: pal.railBg,
              opacity: open ? 1 : 0,
            }}
          >
            <Image
              src={JamesWattImage}
              alt=""
              fill
              sizes="180px"
              className="pointer-events-none object-cover object-[50%_22%]"
            />
          </div>
          {Array.from({ length: 16 }, (_, n) => {
            const stripe = n > 8;
            return (
              <div
                key={n}
                ref={(el) => {
                  ballEls.current[n] = el;
                }}
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 overflow-hidden rounded-full"
                style={{
                  width: r * 2,
                  height: r * 2,
                  background: n === 0 ? IVORY : BALL_COLORS[stripe ? n - 8 : n],
                  boxShadow: BALL_SHADOW,
                  transform: "translate(-999px,-999px)",
                  opacity: open ? 1 : 0,
                  transition: piecesTransition,
                }}
              >
                {stripe &&
                  [capAEls, capBEls].map((refs, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        refs.current[n] = el;
                      }}
                      className="absolute top-0 left-0 rounded-full"
                      style={{ width: r * 2, height: r * 2, background: IVORY }}
                    />
                  ))}
                {n > 0 && (
                  <div
                    ref={(el) => {
                      discEls.current[n] = el;
                    }}
                    className="absolute flex items-center justify-center rounded-full leading-none font-bold"
                    style={{
                      left: r / 2,
                      top: r / 2,
                      width: r,
                      height: r,
                      background: IVORY,
                      color: "#1d2426",
                      fontSize: Math.round(r * 0.72),
                    }}
                  >
                    {n}
                  </div>
                )}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: BALL_HIGHLIGHT }}
                />
              </div>
            );
          })}
          <svg
            width={SW}
            height={SH}
            className="pointer-events-none absolute top-0 left-0 overflow-visible"
          >
            <g ref={guideRef} style={{ opacity: 0, filter: GUIDE_SHADOW }}>
              {[g1Ref, g2Ref, g3Ref].map((ref, i) => (
                <line
                  key={i}
                  ref={ref}
                  stroke={pal.guideInk}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              ))}
              <circle
                ref={ghostRef}
                r={r}
                fill="none"
                stroke={pal.guideInk}
                strokeWidth={3}
              />
            </g>
          </svg>
        </div>
        {pockets.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              holeEls.current[i] = el;
            }}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.d,
              height: p.d,
              margin: -p.d / 2,
              background: pal.holeBg,
              boxShadow: `0 0 0 2px ${pal.pocketBg}`,
            }}
          >
            <div
              ref={(el) => {
                wellEls.current[i] = el;
              }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: HOLE_OVERLAY_SHADOW }}
            />
            <div
              ref={(el) => {
                ringEls.current[i] = el;
              }}
              className="pointer-events-none absolute -inset-[3px] rounded-full border-[3px] opacity-0"
              style={{ borderColor: pal.ringInk }}
            />
          </div>
        ))}
        <div
          ref={cueRef}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: rail,
            top: rail,
            width: Math.round(L * 0.5),
            height: cueH,
            borderRadius: cueH,
            background: pal.cueBg,
            boxShadow: CUE_SHADOW,
            transformOrigin: "0 50%",
            opacity: 0,
          }}
        />
      </div>
    </>
  );
}
