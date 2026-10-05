"use client";

/**
 * @file The intro section's hero: a photo "coin" that tilts towards the cursor
 * and opens into a playable 8-ball pool table.
 *
 * This component owns the closed state (the coin), the open/close transition
 * state, and the responsive and theme plumbing. The game itself lives in
 * `pool/PoolGame` and is lazy-loaded on first hover, focus or click.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import JamesWattImage from "../public/panthy-tiny.webp";
import { MAX_TILT, coinTilt } from "./coinTilt";
import { GLINT_COLOR, GLINT_FADE } from "./pool/theme";

// The game is only needed after the first click, so keep it out of the
// initial bundle. Hovering the coin preloads it.
const loadGame = () => import("./pool/PoolGame");
const PoolGame = dynamic(loadGame, { ssr: false });

/** Perspective distance in px for the coin's 3D tilt (smaller is stronger). */
const COIN_PERSPECTIVE = 700;

// Keep in sync with `coinDiameter` in pool/geometry.ts, which the photo
// sticker on the felt must match. Literal classes so Tailwind can see them.
const TABLE_PORTRAIT = { w: 340, h: 620 };
const TABLE_LANDSCAPE = { w: 1028, h: 548 };
const COIN_SIZE = "h-[130px] w-[130px] md:h-[180px] md:w-[180px]";

/**
 * Photo coin that opens into a pool table. Click, Enter or Space on the coin
 * opens the table; the status panel is rendered below it.
 */
export default function PoolHero() {
  // `loaded` mounts the (closed) game; `open` then flips it open so the
  // clip-path transition has a closed state to animate from.
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Portrait table below Tailwind's `md` breakpoint.
  const [mobile, setMobile] = useState(false);
  // The table layout only follows the viewport while the game is closed, so
  // crossing the breakpoint mid-game can't remount and reset the match.
  const [layoutMobile, setLayoutMobile] = useState(false);
  useEffect(() => {
    if (!open) setLayoutMobile(mobile);
  }, [open, mobile]);
  const [reduced, setReduced] = useState(false);
  // Portal target for the game's status panel. State, not a ref, so the game
  // re-renders once the element exists.
  const [statusHost, setStatusHost] = useState<HTMLDivElement | null>(null);
  // Scale applied to the table so it fits narrow containers, plus the scaled
  // size so the surrounding layout can reserve the right space.
  const [size, setSize] = useState<{
    scale: number;
    w: number;
    h: number;
  } | null>(null);

  const outerRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const coinButtonRef = useRef<HTMLButtonElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  const openRef = useRef(open);
  const pressedRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const tiltRef = useRef({ x: 0, y: 0, s: 1 });
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const wantOpenRef = useRef(false);

  // Eases the coin toward the cursor and its press scale toward its target.
  // Writes styles directly so React never re-renders per frame, and sleeps
  // once everything has settled.
  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    const tick = () => {
      rafRef.current = 0;
      const t = tiltRef.current;
      const target =
        openRef.current || reducedRef.current || !mouseRef.current
          ? { x: 0, y: 0 }
          : mouseRef.current;
      const targetScale = pressedRef.current ? 0.9 : 1;
      t.x += (target.x - t.x) * 0.1;
      t.y += (target.y - t.y) * 0.1;
      t.s += (targetScale - t.s) * 0.25;

      const coin = coinRef.current;
      if (coin) {
        coin.style.transform = `rotateX(${t.x.toFixed(2)}deg) rotateY(${t.y.toFixed(2)}deg) scale(${t.s.toFixed(3)})`;
      }
      const glint = glintRef.current;
      if (glint) {
        const m = Math.min(1, Math.hypot(t.x, t.y) / MAX_TILT);
        glint.style.opacity = (m * 0.9).toFixed(2);
        glint.style.background = `radial-gradient(circle at ${50 + t.y * 1.6}% ${50 - t.x * 1.6}%, ${GLINT_COLOR}, ${GLINT_FADE} 55%)`;
      }

      const settled =
        Math.abs(target.x - t.x) < 0.01 &&
        Math.abs(target.y - t.y) < 0.01 &&
        Math.abs(targetScale - t.s) < 0.001;
      if (!settled) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    openRef.current = open;
    startLoop();
  }, [open, startLoop]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motion.matches;
    setReduced(motion.matches);
    const onMotion = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
      setReduced(e.matches);
      startLoop();
    };
    motion.addEventListener?.("change", onMotion);

    const onPointerMove = (e: PointerEvent) => {
      const coin = coinRef.current?.parentElement;
      if (!coin) return;
      mouseRef.current = coinTilt(
        { x: e.clientX, y: e.clientY },
        coin.getBoundingClientRect(),
      );
      startLoop();
    };
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      motion.removeEventListener?.("change", onMotion);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [startLoop]);

  // Below md the table is portrait.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    setMobile(!wide.matches);
    const onWide = (e: MediaQueryListEvent) => setMobile(!e.matches);
    wide.addEventListener?.("change", onWide);

    return () => {
      wide.removeEventListener?.("change", onWide);
    };
  }, []);

  // Scale the table down to fit narrow containers, keeping aspect ratio. A
  // layout effect so the first paint is already scaled. Until it has run the
  // wrapper reserves the same space in CSS, so nothing shifts.
  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer || typeof ResizeObserver === "undefined") return;
    const natural = layoutMobile ? TABLE_PORTRAIT : TABLE_LANDSCAPE;
    const measure = () => {
      const avail = outer.parentElement?.clientWidth ?? natural.w;
      const scale = Math.min(1, avail / natural.w);
      setSize({ scale, w: natural.w * scale, h: natural.h * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.parentElement) ro.observe(outer.parentElement);
    return () => ro.disconnect();
  }, [layoutMobile]);

  // The game mounts closed so the open transition has something to animate
  // from, then calls back here to flip it open.
  const handleReady = useCallback(() => {
    if (!wantOpenRef.current) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (wantOpenRef.current) setOpen(true);
      }),
    );
  }, []);

  // "End game" is the only way to close the table. It collapses back to the
  // coin, and opening it again starts a new game.
  const close = useCallback(() => {
    wantOpenRef.current = false;
    setOpen(false);
  }, []);

  // Hand keyboard focus back to the coin once the game has been ended.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (wasOpenRef.current && !open) coinButtonRef.current?.focus();
    wasOpenRef.current = open;
  }, [open]);

  // The coin only opens the table.
  const openTable = () => {
    if (open) return;
    wantOpenRef.current = true;
    pressedRef.current = true;
    startLoop();
    window.setTimeout(
      () => {
        pressedRef.current = false;
        startLoop();
        if (loaded) setOpen(true);
        else setLoaded(true);
      },
      reducedRef.current ? 0 : 140,
    );
  };

  return (
    <div className="flex w-full flex-col items-center gap-[36px] md:gap-[48px]">
      <div
        ref={outerRef}
        className={`relative flex-none ${
          size
            ? ""
            : "aspect-340/620 w-full max-w-[340px] md:aspect-1028/548 md:max-w-[1028px]"
        }`}
        style={size ? { width: size.w, height: size.h } : undefined}
      >
        <div
          className={`relative origin-top-left ${
            size
              ? layoutMobile
                ? "h-[620px] w-[340px]"
                : "h-[548px] w-[1028px]"
              : "size-full"
          }`}
          style={size ? { transform: `scale(${size.scale})` } : undefined}
        >
          {loaded && (
            <PoolGame
              key={layoutMobile ? "portrait" : "landscape"}
              open={open}
              mobile={layoutMobile}
              reduced={reduced}
              statusHost={statusHost}
              onReady={handleReady}
              onEnd={close}
            />
          )}
          <div
            inert={open}
            className={`absolute inset-0 z-2 m-auto ${COIN_SIZE} ${open ? "pointer-events-none" : ""}`}
            style={{
              opacity: open ? 0 : 1,
              transition: reduced || !open ? "none" : "opacity .2s ease .3s",
            }}
          >
            <button
              ref={coinButtonRef}
              type="button"
              aria-label="Open pool game"
              onClick={openTable}
              onPointerEnter={loadGame}
              onFocus={loadGame}
              className="absolute inset-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              {/* The perspective must sit on the direct parent of the rotating
                  coin. Set on an ancestor above the button it is flattened away. */}
              <div
                className="absolute inset-0"
                style={{ perspective: COIN_PERSPECTIVE }}
              >
                <div
                  ref={coinRef}
                  className="relative size-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="bg-sand dark:bg-charcoal absolute inset-0 rounded-full"
                    style={{ transform: "translateZ(-9px)" }}
                  />
                  <div
                    className="bg-sand dark:bg-charcoal absolute inset-0 rounded-full"
                    style={{ transform: "translateZ(-4.5px)" }}
                  />
                  <div className="bg-darkbrown dark:bg-darkteal dark:border-darkteal shadow-coin dark:shadow-coin-dark absolute inset-0 overflow-hidden rounded-full border-4 border-white">
                    <Image
                      src={JamesWattImage}
                      alt="James Watt"
                      fill
                      priority
                      fetchPriority="high"
                      placeholder="blur"
                      sizes="180px"
                      className="pointer-events-none object-cover object-[50%_22%]"
                    />
                    <div
                      ref={glintRef}
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={setStatusHost}
        className="flex w-full justify-center"
        style={size ? { maxWidth: size.w } : undefined}
      />
    </div>
  );
}
