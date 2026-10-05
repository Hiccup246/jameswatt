"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import JamesWattImage from "../../public/panthy-tiny.webp";
import {
  PoolEngine,
  roll,
  tableConfig,
  type PotEvent,
  type Vec3,
} from "./engine";
import { cushionSegments } from "./geometry";
import {
  BALL_COLORS,
  BALL_HIGHLIGHT,
  BALL_SHADOW,
  CUE_SHADOW,
  GUIDE_SHADOW,
  IVORY,
  HOLE_OVERLAY_SHADOW,
  SCRATCH_RING,
  ballBackground,
  paletteFor,
} from "./theme";

interface Props {
  open: boolean;
  mobile: boolean;
  dark: boolean;
  reduced: boolean;
  /** Element below the table that the status panel is portalled into. */
  statusHost: HTMLElement | null;
  /** Called once the (closed) board has mounted, so the open transition can run. */
  onReady: () => void;
}

interface Strike {
  ang: number;
  power: number;
  pull: number;
}

type Point = { u: number; v: number };

interface AiPlan {
  from: number;
  to: number;
  power: number;
  t0: number;
}

const setAttrs = (el: SVGElement | null, attrs: Record<string, number>) => {
  if (!el) return;
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
};
const ZERO_LINE = { x1: 0, y1: 0, x2: 0, y2: 0 };

export default function PoolGame({
  open,
  mobile,
  dark,
  reduced,
  statusHost,
  onReady,
}: Props) {
  const cfg = useMemo(() => tableConfig(mobile), [mobile]);
  const { L, Wd, r } = cfg;
  const horiz = !mobile;
  const rail = mobile ? 20 : 34;
  const D = mobile ? 130 : 180;
  const SW = horiz ? L : Wd;
  const SH = horiz ? Wd : L;
  const TW = SW + rail * 2;
  const TH = SH + rail * 2;
  const cueH = mobile ? 7 : 9;
  const pal = paletteFor(dark);

  const engineRef = useRef<PoolEngine | null>(null);
  if (!engineRef.current) engineRef.current = new PoolEngine(cfg);
  const engine = engineRef.current;

  // Bumped on game events (shot resolved, re-rack) so React-rendered UI refreshes.
  const [, setVersion] = useState(0);
  const bump = () => setVersion((v) => v + 1);

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
  const ptr = useRef<Point | null>(null);
  const pull = useRef<Point | null>(null);
  const pullAmt = useRef(0);
  const strike = useRef<Strike | null>(null);
  const aiPlan = useRef<AiPlan | null>(null);
  const prevPos = useRef<({ x: number; y: number } | null)[]>([]);
  const openRef = useRef(open);

  const map = (u: number, v: number): [number, number] =>
    horiz ? [u, v] : [v, u];

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

  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-rack whenever the table is opened.
  useEffect(() => {
    openRef.current = open;
    if (!open) return;
    engine.rack();
    clearClones();
    aim.current = 0;
    pull.current = null;
    pullAmt.current = 0;
    strike.current = null;
    aiPlan.current = null;
    prevPos.current = [];
    bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const setPtr = (e: PointerEvent | React.PointerEvent) => {
      const s = surfRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const x = ((e.clientX - rect.left) * SW) / rect.width;
      const y = ((e.clientY - rect.top) * SH) / rect.height;
      ptr.current = horiz ? { u: x, v: y } : { u: y, v: x };
    };
    const onMove = (e: PointerEvent) => setPtr(e);
    const onUp = () => {
      if (!pull.current) return;
      const p = pullAmt.current;
      pull.current = null;
      if (p > 0.03) strike.current = { ang: aim.current, power: p, pull: p };
      else pullAmt.current = 0;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [SW, SH, horiz]);

  const onSurfaceDown = (e: React.PointerEvent) => {
    const s = surfRef.current;
    if (!s) return;
    const rect = s.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * SW) / rect.width;
    const y = ((e.clientY - rect.top) * SH) / rect.height;
    ptr.current = horiz ? { u: x, v: y } : { u: y, v: x };
    if (!engine.canAim() || strike.current) return;
    const cb = engine.cue;
    aim.current = Math.atan2(ptr.current.v - cb.v, ptr.current.u - cb.u);
    pull.current = { u: ptr.current.u, v: ptr.current.v };
    pullAmt.current = 0;
  };

  useEffect(() => {
    if (!open) return;
    let raf = 0;

    const paintBall = (n: number, o: { n: Vec3; a: Vec3; t1: Vec3 }) => {
      const cap = (el: HTMLDivElement | null, p: Vec3) => {
        if (!el) return;
        const ca = 0.643;
        const sa = 0.766;
        const s = Math.hypot(p[0], p[1]);
        const pz = p[2];
        const z1 = pz * ca + s * sa;
        let r1 = s * ca - pz * sa;
        const z2 = pz * ca - s * sa;
        let r2 = s * ca + pz * sa;
        if (z1 < 0 && z2 < 0) {
          el.style.opacity = "0";
          return;
        }
        if (z1 < 0) r1 = 1.1;
        if (z2 < 0) r2 = 1.1;
        const lo = Math.min(r1, r2);
        const hi = Math.max(r1, r2);
        const mid = (lo + hi) / 2;
        const ph = Math.atan2(p[1], p[0]);
        el.style.opacity = "1";
        el.style.transform = `translate(${mid * Math.cos(ph) * r}px,${mid * Math.sin(ph) * r}px) rotate(${ph}rad) scale(${(hi - lo) / 2},${sa})`;
      };
      cap(capAEls.current[n], o.a);
      cap(capBEls.current[n], [-o.a[0], -o.a[1], -o.a[2]]);
      const dEl = discEls.current[n];
      if (dEl) {
        const nn = o.n;
        const t1 = o.t1;
        const t2 = [
          nn[1] * t1[2] - nn[2] * t1[1],
          nn[2] * t1[0] - nn[0] * t1[2],
          nn[0] * t1[1] - nn[1] * t1[0],
        ];
        if (nn[2] < 0) {
          dEl.style.opacity = "0";
          return;
        }
        dEl.style.opacity = "1";
        dEl.style.transform = `matrix(${t1[0]},${t1[1]},${t2[0]},${t2[1]},${nn[0] * r * 0.866},${nn[1] * r * 0.866})`;
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

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const cb = engine.cue;

      if (engine.moving && engine.step()) bump();
      for (const ev of engine.potEvents.splice(0)) {
        if (reducedRef.current) continue;
        startSink(ev);
        pocketFx(ev);
      }
      engine.tickSinks();

      if (strike.current) {
        const s = strike.current;
        s.pull -= 0.22;
        pullAmt.current = Math.max(0, s.pull);
        if (s.pull <= -0.05) {
          strike.current = null;
          engine.shoot(s.ang, s.power);
          pullAmt.current = 0;
        }
      } else if (engine.canAim()) {
        if (ptr.current && !pull.current) {
          aim.current = Math.atan2(ptr.current.v - cb.v, ptr.current.u - cb.u);
        }
        if (pull.current && ptr.current) {
          pullAmt.current = Math.min(
            1,
            Math.hypot(
              ptr.current.u - pull.current.u,
              ptr.current.v - pull.current.v,
            ) /
              (L * 0.28),
          );
        }
      } else if (
        !engine.moving &&
        !engine.winner &&
        engine.turn === "james" &&
        cb.on
      ) {
        // James: idle sway, ease the aim round, draw the cue back, strike.
        if (!aiPlan.current) {
          const plan = engine.planAi(aim.current);
          aiPlan.current = {
            from: aim.current,
            to: plan.ang,
            power: plan.power,
            t0: performance.now(),
          };
        }
        const a = aiPlan.current;
        const el = performance.now() - a.t0;
        const k = Math.max(0, Math.min(1, (el - 1400) / 1700));
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const sway = el < 1400 ? Math.sin(el / 260) * 0.06 * (el / 1400) : 0;
        aim.current = a.from + (a.to - a.from) * e + sway;
        if (el > 3300) {
          pullAmt.current = Math.min(a.power, ((el - 3300) / 1400) * a.power);
        }
        if (el > 4850) {
          strike.current = { ang: a.to, power: a.power, pull: a.power };
          aiPlan.current = null;
        }
      }

      for (const b of engine.balls) {
        const el = ballEls.current[b.n];
        if (!el) continue;
        if (b.sink) {
          // Roll to the pocket centre (t 0 to .45), then only the copy in the
          // hole is visible while it falls.
          const sk = b.sink;
          const t = sk.t;
          const m = Math.min(1, t / 0.45);
          const k = 1 - Math.pow(1 - m, 2);
          const [x, y] = map(
            sk.u0 + (sk.pu - sk.u0) * k,
            sk.v0 + (sk.pv - sk.v0) * k,
          );
          const [pcx, pcy] = map(sk.pu, sk.pv);
          const rolling = t < 0.45 && !reducedRef.current;
          const prev = prevPos.current[b.n];
          if (rolling && prev) roll(b, x - prev.x, y - prev.y, r, Math.random);
          prevPos.current[b.n] = { x, y };
          el.style.transform = `translate(${x - r}px,${y - r}px)`;
          el.style.visibility = rolling ? "visible" : "hidden";

          const copy = clones.current.get(b.n);
          if (copy) {
            const fall = Math.max(0, (t - 0.2) / 0.8);
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
            copy.style.opacity = String(1 - Math.max(0, (t - 0.8) / 0.2));
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

      const showCue = cb.on && !engine.moving && !engine.winner;
      const cue = cueRef.current;
      if (cue) {
        cue.style.opacity = showCue ? "1" : "0";
        if (showCue) {
          const [cx, cy] = map(cb.u, cb.v);
          const [dx, dy] = map(Math.cos(aim.current), Math.sin(aim.current));
          const back = r + 4 + pullAmt.current * L * 0.12;
          const px = cx - dx * back;
          const py = cy - dy * back;
          const a = Math.atan2(-dy, -dx);
          cue.style.transform = `translate(${px}px,${py - cueH / 2}px) rotate(${a}rad)`;
        }
      }

      const guide = guideRef.current;
      if (guide) {
        const show = showCue && engine.turn === "you" && !strike.current;
        guide.style.opacity = show ? "1" : "0";
        if (show) {
          const hit = engine.ray(cb, aim.current);
          const [x1, y1] = map(cb.u, cb.v);
          const [gx, gy] = map(hit.gu, hit.gv);
          setAttrs(g1Ref.current, { x1, y1, x2: gx, y2: gy });
          setAttrs(ghostRef.current, { cx: gx, cy: gy });
          if (hit.hit) {
            const ou = hit.hit.u - hit.gu;
            const ov = hit.hit.v - hit.gv;
            const ol = Math.hypot(ou, ov) || 1;
            const len = L * 0.08;
            const [bx, by] = map(hit.hit.u, hit.hit.v);
            const [ex, ey] = map(
              hit.hit.u + (ou / ol) * len,
              hit.hit.v + (ov / ol) * len,
            );
            setAttrs(g2Ref.current, { x1: bx, y1: by, x2: ex, y2: ey });
            const nu = ou / ol;
            const nv = ov / ol;
            const du = Math.cos(aim.current);
            const dv = Math.sin(aim.current);
            const dn = du * nu + dv * nv;
            const tu = du - dn * nu;
            const tv = dv - dn * nv;
            const tl = Math.hypot(tu, tv);
            if (tl > 0.02) {
              const cl = len * 1.4 * tl;
              const [cx2, cy2] = map(
                hit.gu + (tu / tl) * cl,
                hit.gv + (tv / tl) * cl,
              );
              setAttrs(g3Ref.current, { x1: gx, y1: gy, x2: cx2, y2: cy2 });
            } else {
              setAttrs(g3Ref.current, ZERO_LINE);
            }
          } else {
            setAttrs(g2Ref.current, ZERO_LINE);
            setAttrs(g3Ref.current, ZERO_LINE);
          }
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
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

  const [hx, hy] = map(L * 0.25, 0);
  const [fx, fy] = map(L * 0.73, Wd / 2);
  const railR = mobile ? 22 : 30;
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

  const chips = (who: "you" | "james") => {
    const g = engine.groups[who];
    return g ? engine.left(g).map((b) => b.n) : [];
  };
  const player = (who: "you" | "james") => {
    const active = engine.turn === who && !engine.winner;
    const group = engine.groups[who];
    const isYou = who === "you";
    const label = (
      <>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: pal.ink, opacity: active ? 1 : 0 }}
        />
      </>
    );
    return (
      <div
        className={`flex flex-col gap-1.5 ${isYou ? "items-end" : "items-start"}`}
      >
        <span
          className="flex items-center gap-1.5"
          style={{ fontWeight: engine.turn === who ? 700 : 400 }}
        >
          {isYou ? (
            <>
              <span className="font-normal opacity-60">{group ?? ""}</span>
              You
              {label}
            </>
          ) : (
            <>
              {label}
              James
              <span className="font-normal opacity-60">{group ?? ""}</span>
            </>
          )}
        </span>
        <div className={`flex flex-wrap gap-1 ${isYou ? "justify-end" : ""}`}>
          {chips(who).map((n) => (
            <span
              key={n}
              className="h-3.5 w-3.5 rounded-full"
              style={{
                background: ballBackground(n, horiz),
                boxShadow: "inset 0 -1px 2px rgba(0,0,0,.3)",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const status = (
    <div
      className="flex flex-col gap-3 text-[13px] tracking-[.04em]"
      style={{ width: "100%", maxWidth: TW, color: pal.ink }}
    >
      <div className="flex min-h-[34px] items-center justify-center gap-4 text-center text-pretty">
        <span aria-live="polite" className="text-sm font-semibold">
          {engine.message}
        </span>
        {engine.winner && (
          <button
            type="button"
            onClick={() => {
              engine.rack();
              clearClones();
              aim.current = 0;
              aiPlan.current = null;
              strike.current = null;
              pullAmt.current = 0;
              prevPos.current = [];
              bump();
            }}
            className="cursor-pointer rounded-full border-none px-4 py-2 font-semibold tracking-[.04em] hover:opacity-85"
            style={{ background: pal.btnBg, color: pal.btnInk }}
          >
            Play again
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        {player("james")}
        {player("you")}
      </div>
    </div>
  );

  return (
    <>
      {open && statusHost && createPortal(status, statusHost)}
      <div
        className={`absolute inset-0 ${open ? "" : "pointer-events-none"}`}
        style={{
          boxSizing: "border-box",
          borderRadius: railR,
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
          onPointerDown={onSurfaceDown}
          className="absolute cursor-crosshair overflow-hidden"
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
              alt="James Watt"
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
