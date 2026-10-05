import type { TableConfig } from "./engine";

export interface CushionSegment {
  /** Polygon points for the cushion body (screen px, relative to the board). */
  pts: string;
  /** Polyline points for the nose, the edge facing the felt. */
  nose: string;
}

/** Depth of the cushion band outside the felt edge. */
export const CUSHION_BAND = 8;

/**
 * Six cushion segments: two per long rail (split at the side pocket) and one
 * per short rail. The nose runs between the pocket mouths, and the back edge
 * extends `jaw` further at each end so the ends angle into the pocket. Mouth
 * sizes match the physics (corner 1.6r, side 1.3r either side of centre).
 */
export function cushionSegments(
  { L, Wd, r }: TableConfig,
  horiz: boolean,
  rail: number,
): CushionSegment[] {
  const cb = CUSHION_BAND;
  const cm = r * 1.6;
  const sm = r * 1.3;
  const jaw = cb * 1.1;

  const pts = (arr: [number, number][]) =>
    arr
      .map(([u, v]) => {
        const [x, y] = horiz ? [u, v] : [v, u];
        return `${(rail + x).toFixed(1)},${(rail + y).toFixed(1)}`;
      })
      .join(" ");

  // Long-rail segment: nose at v = vIn, back edge at v = vOut.
  const segU = (
    u1: number,
    u2: number,
    vIn: number,
    vOut: number,
  ): CushionSegment => ({
    pts: pts([
      [u1, vIn],
      [u2, vIn],
      [u2 + jaw, vOut],
      [u1 - jaw, vOut],
    ]),
    nose: pts([
      [u1, vIn],
      [u2, vIn],
    ]),
  });

  // Short-rail segment: nose at u = uIn, back edge at u = uOut.
  const segV = (
    v1: number,
    v2: number,
    uIn: number,
    uOut: number,
  ): CushionSegment => ({
    pts: pts([
      [uIn, v1],
      [uIn, v2],
      [uOut, v2 + jaw],
      [uOut, v1 - jaw],
    ]),
    nose: pts([
      [uIn, v1],
      [uIn, v2],
    ]),
  });

  return [
    segU(cm, L / 2 - sm, 0, -cb),
    segU(L / 2 + sm, L - cm, 0, -cb),
    segU(cm, L / 2 - sm, Wd, Wd + cb),
    segU(L / 2 + sm, L - cm, Wd, Wd + cb),
    segV(cm, Wd - cm, 0, -cb),
    segV(cm, Wd - cm, L, L + cb),
  ];
}
