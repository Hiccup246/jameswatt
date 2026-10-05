// Palette for colours that are set from JS (gradients, shadows, cue). Static
// colours use Tailwind `dark:` utilities. Values come from the pool hero handoff.

export const IVORY = "#f7f4ee";

export const BALL_COLORS: Record<number, string> = {
  1: "#f2c230",
  2: "#2a5bd7",
  3: "#d8342c",
  4: "#6b3fa0",
  5: "#ef7d22",
  6: "#1f8a4c",
  7: "#8a2b2b",
  8: "#16191a",
};

export const BALL_SHADOW =
  "inset -2px -3px 4px rgba(0,0,0,.28), 0 2px 3px rgba(0,0,0,.35)";
export const BALL_HIGHLIGHT =
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 42%)";
export const HOLE_OVERLAY_SHADOW =
  "inset 0 3px 6px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.25)";
export const SCRATCH_RING = "#d8342c";
export const CUE_SHADOW = "0 4px 8px rgba(0,0,0,.3)";
export const GUIDE_SHADOW =
  "drop-shadow(0 0 0.6px rgba(0,0,0,.9)) drop-shadow(0 0 0.6px rgba(0,0,0,.9))";

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
  lineInk: string;
  guideInk: string;
  photoBorder: string;
  photoShadow: string;
  coinShadow: string;
  ink: string;
  coinEdge: string;
  btnBg: string;
  btnInk: string;
  cueBg: string;
}

const cue = (butt: string) =>
  `linear-gradient(90deg, #6f8fae 0 1.2%, #f4efe6 1.2% 3.5%, #e7cfa4 3.5% 55%, #b98a55 70%, ${butt} 72% 100%)`;

const lightPhotoShadow = "0 0 0 2px rgba(44,54,57,.28)";
const darkPhotoShadow = "0 0 0 2px rgba(215,220,226,.55)";

export const LIGHT: Palette = {
  railBg: "#f2dfce",
  railShadow:
    "inset 0 2px 0 rgba(255,255,255,.75), inset 0 -3px 0 rgba(120,80,40,.08), 0 24px 48px -26px rgba(120,80,40,.45)",
  feltBg:
    "radial-gradient(ellipse at 50% 50%, oklch(0.74 0.075 192), oklch(0.66 0.075 196))",
  cushionBg: "oklch(0.6 0.07 196)",
  pocketBg: "#2c3639",
  holeBg:
    "radial-gradient(circle at 50% 42%, #000 0 48%, #111718 70%, #2c3639 100%)",
  plateBg: "linear-gradient(145deg, #fffaf4, #d8bfa8 70%)",
  plateShadow: "inset 0 1px 0 #ffffff, 0 1px 2px rgba(120,80,40,.35)",
  noseInk: "rgba(255,255,255,.35)",
  ringInk: "#ffffff",
  diamondBg: "rgba(44,54,57,.45)",
  lineInk: "rgba(255,255,255,.35)",
  guideInk: "rgba(255,255,255,.95)",
  photoBorder: "4px solid #ffffff",
  photoShadow: lightPhotoShadow,
  coinShadow: `${lightPhotoShadow}, 0 26px 40px -18px rgba(120,80,40,.45)`,
  ink: "#000000",
  coinEdge: "#e3c9b1",
  btnBg: "#2c3639",
  btnInk: "#ffffff",
  cueBg: cue("#2c3639"),
};

export const DARK: Palette = {
  railBg: "#3f4e4f",
  railShadow:
    "inset 0 1px 0 rgba(255,255,255,.08), inset 0 -2px 0 rgba(0,0,0,.25), 0 24px 48px -24px rgba(0,0,0,.6)",
  feltBg:
    "radial-gradient(ellipse at 50% 50%, oklch(0.47 0.06 200), oklch(0.39 0.055 205))",
  cushionBg: "oklch(0.34 0.05 205)",
  pocketBg: "#151b1c",
  holeBg:
    "radial-gradient(circle at 50% 42%, #000 0 48%, #0c1011 70%, #222b2d 100%)",
  plateBg: "linear-gradient(145deg, #5d6e72, #2a3436 70%)",
  plateShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(0,0,0,.4)",
  noseInk: "rgba(255,255,255,.12)",
  ringInk: "#d7dce2",
  diamondBg: "rgba(215,220,226,.6)",
  lineInk: "rgba(215,220,226,.22)",
  guideInk: "rgba(255,255,255,.85)",
  photoBorder: "4px solid #3f4e4f",
  photoShadow: darkPhotoShadow,
  coinShadow: `${darkPhotoShadow}, 0 26px 40px -18px rgba(0,0,0,.7)`,
  ink: "#d7dce2",
  coinEdge: "#1d2426",
  btnBg: "#d7dce2",
  btnInk: "#2c3639",
  cueBg: cue("#1d2426"),
};

export const paletteFor = (dark: boolean): Palette => (dark ? DARK : LIGHT);

/** Background for a ball or status chip. Stripes (9-15) get an ivory band. */
export function ballBackground(n: number, horizontal: boolean): string {
  if (n === 0) return IVORY;
  if (n <= 8) return BALL_COLORS[n];
  const c = BALL_COLORS[n - 8];
  return `linear-gradient(${horizontal ? 0 : 90}deg, ${IVORY} 0 22%, ${c} 22% 78%, ${IVORY} 78%)`;
}
