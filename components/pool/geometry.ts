/**
 * @file Table layout and drawing geometry shared by the pool renderer.
 *
 * Everything here is pure so it can be unit tested without a DOM.
 */

import type { RayResult, TableConfig } from "./engine";

/** Fixed pixel sizes of the table furniture, which differ by orientation. */
export interface TableLayout {
  /** Width of the rail around the felt. */
  rail: number;
  /** Corner radius of the rail. */
  railRadius: number;
  /** Diameter of the photo coin and the sticker it settles into. */
  coinDiameter: number;
  /** Thickness of the cue. */
  cueThickness: number;
}

/** Furniture sizes for the portrait (mobile) or landscape (desktop) table. */
export function tableLayout(mobile: boolean): TableLayout {
  return mobile
    ? { rail: 20, railRadius: 22, coinDiameter: 130, cueThickness: 7 }
    : { rail: 34, railRadius: 30, coinDiameter: 180, cueThickness: 9 };
}

/** A line in table space (u along the long side, v across it). */
export interface Line {
  u1: number;
  v1: number;
  u2: number;
  v2: number;
}

/** The three aiming guides drawn while it is the player's turn. */
export interface GuideLines {
  /** Cue ball to the contact point (ghost ball). */
  aim: Line;
  /** Direction the object ball will travel, or null when no ball is hit. */
  object: Line | null;
  /** Direction the cue ball deflects, or null for a straight-on hit. */
  deflect: Line | null;
}

/** Below this length the cue ball is considered to stop dead (full-on hit). */
const MIN_DEFLECTION = 0.02;

/**
 * Computes the aiming guides for a cue ball struck along `angle`.
 *
 * @param cue Cue ball position in table space.
 * @param hit Result of casting the cue ball along `angle`.
 * @param angle Aim angle in radians in table space.
 * @param tableLength Long side of the felt, which scales the guide lengths.
 */
export function guideLines(
  cue: { u: number; v: number },
  hit: RayResult,
  angle: number,
  tableLength: number,
): GuideLines {
  const aim = { u1: cue.u, v1: cue.v, u2: hit.gu, v2: hit.gv };
  if (!hit.hit) return { aim, object: null, deflect: null };

  const len = tableLength * 0.08;
  // Unit vector from the ghost ball to the object ball: the line of impact.
  const ou = hit.hit.u - hit.gu;
  const ov = hit.hit.v - hit.gv;
  const ol = Math.hypot(ou, ov) || 1;
  const nu = ou / ol;
  const nv = ov / ol;
  const object = {
    u1: hit.hit.u,
    v1: hit.hit.v,
    u2: hit.hit.u + nu * len,
    v2: hit.hit.v + nv * len,
  };

  // The cue ball keeps the component of its velocity along the tangent.
  const du = Math.cos(angle);
  const dv = Math.sin(angle);
  const dn = du * nu + dv * nv;
  const tu = du - dn * nu;
  const tv = dv - dn * nv;
  const tl = Math.hypot(tu, tv);
  if (tl <= MIN_DEFLECTION) return { aim, object, deflect: null };

  const dl = len * 1.4 * tl;
  return {
    aim,
    object,
    deflect: {
      u1: hit.gu,
      v1: hit.gv,
      u2: hit.gu + (tu / tl) * dl,
      v2: hit.gv + (tv / tl) * dl,
    },
  };
}

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
