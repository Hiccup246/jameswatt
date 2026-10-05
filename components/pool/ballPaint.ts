/**
 * @file Pure maths for drawing a rolling pool ball with CSS transforms.
 *
 * Each ball keeps 3D unit vectors (see `Orientation` in engine.ts) in screen
 * space with z pointing at the viewer. These helpers turn them into the 2D
 * CSS transforms for the number disc and the two ivory caps of a stripe.
 */

import type { Orientation, Vec3 } from "./engine";

/** cos and sin of the 50 degree half-angle of a stripe cap. */
const CAP_COS = 0.643;
const CAP_SIN = 0.766;

/** Any radius beyond the limb of the ball; used when a cap edge wraps round the back. */
const BEYOND_LIMB = 1.1;

/** The number disc is drawn this fraction of a radius away from the ball centre. */
const DISC_OFFSET = 0.866;

/**
 * Transform for one ivory cap of a stripe ball, centred on pole `p`.
 *
 * The cap is a flat ellipse that spans from the visible rim of the cap to the
 * limb of the ball. The ball's `overflow: hidden` clips whatever spills over.
 *
 * @param p Unit vector from the ball centre to the cap pole.
 * @param r Ball radius in px.
 * @return The CSS transform, or null when the cap is entirely on the far side.
 */
export function capTransform(p: Vec3, r: number): string | null {
  const s = Math.hypot(p[0], p[1]);
  const pz = p[2];
  const z1 = pz * CAP_COS + s * CAP_SIN;
  let r1 = s * CAP_COS - pz * CAP_SIN;
  const z2 = pz * CAP_COS - s * CAP_SIN;
  let r2 = s * CAP_COS + pz * CAP_SIN;
  if (z1 < 0 && z2 < 0) return null;
  if (z1 < 0) r1 = BEYOND_LIMB;
  if (z2 < 0) r2 = BEYOND_LIMB;
  const lo = Math.min(r1, r2);
  const hi = Math.max(r1, r2);
  const mid = (lo + hi) / 2;
  const phase = Math.atan2(p[1], p[0]);
  return `translate(${mid * Math.cos(phase) * r}px,${mid * Math.sin(phase) * r}px) rotate(${phase}rad) scale(${(hi - lo) / 2},${CAP_SIN})`;
}

/**
 * Transform for the flat number disc on a ball.
 *
 * @param o The ball's current orientation.
 * @param r Ball radius in px.
 * @return The CSS matrix, or null when the number faces away from the viewer.
 */
export function discTransform(o: Orientation, r: number): string | null {
  const { n, t1 } = o;
  if (n[2] < 0) return null;
  // The second tangent completes the disc's frame so it foreshortens correctly.
  const t2 = [
    n[1] * t1[2] - n[2] * t1[1],
    n[2] * t1[0] - n[0] * t1[2],
    n[0] * t1[1] - n[1] * t1[0],
  ];
  return `matrix(${t1[0]},${t1[1]},${t2[0]},${t2[1]},${n[0] * r * DISC_OFFSET},${n[1] * r * DISC_OFFSET})`;
}
