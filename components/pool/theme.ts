// Colours for the pool game, set from JS (gradients, shadows, cue). Every value
// is a CSS variable defined in `styles/globals.css`: palette colours are theme
// tokens (`--color-*`, `--shadow-*`) and the light/dark choices are `--pool-*`
// variables that switch with the `dark` class on <html>. Nothing here holds a
// hex value, and nothing needs to know which theme is active.

export const IVORY = "var(--color-ivory)";

export const BALL_COLORS: Record<number, string> = {
  1: "var(--color-ball-1)",
  2: "var(--color-ball-2)",
  3: "var(--color-ball-3)",
  4: "var(--color-ball-4)",
  5: "var(--color-ball-5)",
  6: "var(--color-ball-6)",
  7: "var(--color-ball-7)",
  8: "var(--color-ball-8)",
};

export const BALL_SHADOW = "var(--shadow-ball)";
export const BALL_HIGHLIGHT = "var(--pool-ball-highlight)";
export const HOLE_OVERLAY_SHADOW = "var(--shadow-hole-overlay)";
export const SCRATCH_RING = "var(--color-scratch)";
export const CUE_SHADOW = "var(--shadow-cue)";
export const CHIP_SHADOW = "var(--shadow-chip)";
/** A soft dark outline so the white guides read on any felt. Applied twice. */
export const GUIDE_SHADOW =
  "drop-shadow(var(--drop-shadow-guide)) drop-shadow(var(--drop-shadow-guide))";
export const HAND_SHADOW = "drop-shadow(var(--drop-shadow-guide))";
/** The coin's moving highlight, which fades to transparent. */
export const GLINT_COLOR = "var(--pool-glint)";
export const GLINT_FADE = "var(--pool-glint-fade)";

export interface Palette {
  railBg: string;
  railShadow: string;
  feltBg: string;
  cushionBg: string;
  pocketBg: string;
  holeBg: string;
  plateBg: string;
  plateShadow: string;
  noseInk: string;
  ringInk: string;
  diamondBg: string;
  /** Shading over the kitchen (behind the head string) on the break. */
  kitchenBg: string;
  lineInk: string;
  guideInk: string;
  photoBorder: string;
  photoShadow: string;
  ink: string;
  btnBg: string;
  btnInk: string;
  cueBg: string;
}

export const PALETTE: Palette = {
  railBg: "var(--pool-rail)",
  railShadow: "var(--pool-rail-shadow)",
  feltBg: "var(--pool-felt)",
  cushionBg: "var(--pool-cushion)",
  pocketBg: "var(--pool-pocket)",
  holeBg: "var(--pool-hole)",
  plateBg: "var(--pool-plate)",
  plateShadow: "var(--pool-plate-shadow)",
  noseInk: "var(--pool-nose)",
  ringInk: "var(--pool-ring)",
  diamondBg: "var(--pool-diamond)",
  kitchenBg: "var(--pool-kitchen)",
  lineInk: "var(--pool-line)",
  guideInk: "var(--pool-guide)",
  photoBorder: "4px solid var(--pool-photo-border)",
  photoShadow: "var(--pool-photo-shadow)",
  ink: "var(--pool-ink)",
  btnBg: "var(--pool-btn-bg)",
  btnInk: "var(--pool-btn-ink)",
  cueBg: "var(--pool-cue)",
};

/** Background for a ball or status chip. Stripes (9-15) get an ivory band. */
export function ballBackground(n: number, horizontal: boolean): string {
  if (n === 0) return IVORY;
  if (n <= 8) return BALL_COLORS[n];
  const c = BALL_COLORS[n - 8];
  return `linear-gradient(${horizontal ? 0 : 90}deg, ${IVORY} 0 22%, ${c} 22% 78%, ${IVORY} 78%)`;
}
