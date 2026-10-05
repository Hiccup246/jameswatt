"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import JamesWattImage from "../public/panthy-tiny.webp";

// The game is only needed after the first click, so keep it out of the
// initial bundle. Hovering the coin preloads it.
const loadGame = () => import("./pool/PoolGame");
const PoolGame = dynamic(loadGame, { ssr: false });

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

const COIN_SIZE = "h-[130px] w-[130px] md:h-[180px] md:w-[180px]";

export default function PoolHero() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [statusHost, setStatusHost] = useState<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{
    scale: number;
    w: number;
    h: number;
  } | null>(null);

  const outerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  const openRef = useRef(open);
  const pressedRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const tiltRef = useRef({ x: 0, y: 0, s: 1 });
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const wantOpenRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    startLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Eases the coin toward the cursor. Writes styles directly so React never
  // re-renders per frame, and sleeps once everything has settled.
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
        const m = Math.min(1, Math.hypot(t.x, t.y) / 30);
        glint.style.opacity = (m * 0.9).toFixed(2);
        glint.style.background = `radial-gradient(circle at ${50 + t.y * 1.6}% ${50 - t.x * 1.6}%, rgba(255,255,255,.45), rgba(255,255,255,0) 55%)`;
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
      const r = coin.getBoundingClientRect();
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 2.2));
      const dy = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 2.2));
      mouseRef.current = { x: -dy * 30, y: dx * 30 };
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

  // Below md the table is portrait; theme colours set from JS follow html.dark.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    setMobile(!wide.matches);
    const onWide = (e: MediaQueryListEvent) => setMobile(!e.matches);
    wide.addEventListener?.("change", onWide);

    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setDark(root.classList.contains("dark")),
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      wide.removeEventListener?.("change", onWide);
      observer.disconnect();
    };
  }, []);

  // Scale the table down to fit narrow containers, keeping aspect ratio.
  useEffect(() => {
    const outer = outerRef.current;
    const box = boxRef.current;
    if (!outer || !box || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const avail = outer.parentElement?.clientWidth ?? box.offsetWidth;
      const scale = Math.min(1, avail / box.offsetWidth);
      setSize({
        scale,
        w: box.offsetWidth * scale,
        h: box.offsetHeight * scale,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.parentElement) ro.observe(outer.parentElement);
    return () => ro.disconnect();
  }, []);

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

  const close = useCallback(() => {
    wantOpenRef.current = false;
    setOpen(false);
  }, []);

  const toggle = () => {
    if (open) {
      close();
      return;
    }
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
        className="relative flex-none"
        style={size ? { width: size.w, height: size.h } : undefined}
      >
        <div
          ref={boxRef}
          className="relative h-[620px] w-[340px] origin-top-left md:h-[548px] md:w-[1028px]"
          style={size ? { transform: `scale(${size.scale})` } : undefined}
        >
          {loaded && (
            <PoolGame
              key={mobile ? "portrait" : "landscape"}
              open={open}
              mobile={mobile}
              dark={dark}
              reduced={reduced}
              statusHost={statusHost}
              onClose={close}
              onReady={handleReady}
            />
          )}
          <div
            className={`absolute inset-0 z-[2] m-auto ${COIN_SIZE} ${open ? "pointer-events-none" : ""}`}
            style={{
              perspective: 700,
              opacity: open ? 0 : 1,
              transition: reduced || !open ? "none" : "opacity .2s ease .3s",
            }}
            aria-hidden={open}
          >
            <button
              type="button"
              aria-label={open ? "Close pool game" : "Open pool game"}
              onClick={toggle}
              onPointerEnter={loadGame}
              onFocus={loadGame}
              tabIndex={open ? -1 : 0}
              className="absolute inset-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <div
                ref={coinRef}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-[#e3c9b1] dark:bg-[#1d2426]"
                  style={{ transform: "translateZ(-9px)" }}
                />
                <div
                  className="absolute inset-0 rounded-full bg-[#e3c9b1] dark:bg-[#1d2426]"
                  style={{ transform: "translateZ(-4.5px)" }}
                />
                <div className="bg-darkbrown dark:bg-darkteal absolute inset-0 overflow-hidden rounded-full border-4 border-white shadow-[0_0_0_2px_rgba(44,54,57,.28),0_26px_40px_-18px_rgba(120,80,40,.45)] dark:border-[#3f4e4f] dark:shadow-[0_0_0_2px_rgba(215,220,226,.55),0_26px_40px_-18px_rgba(0,0,0,.7)]">
                  <Image
                    src={JamesWattImage}
                    alt="James Watt"
                    fill
                    priority
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
            </button>
          </div>
        </div>
      </div>

      {!open && (
        <div className="flex h-5 items-center text-[13px] tracking-[.04em] text-black dark:text-[#d7dce2]">
          Click me to play
        </div>
      )}
      <div
        ref={setStatusHost}
        className="flex w-full justify-center"
        style={size ? { maxWidth: size.w } : undefined}
      />
    </div>
  );
}
