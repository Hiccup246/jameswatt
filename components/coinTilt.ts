/**
 * @file The coin's tilt maths, kept pure so the direction can be unit tested.
 *
 * The coin turns its face toward the cursor: with a perspective, `rotateY`
 * is positive when the cursor is to the right (the right edge recedes) and
 * `rotateX` is negative when the cursor is below (the bottom edge recedes).
 */

/** Maximum coin tilt in degrees. */
export const MAX_TILT = 30;
/** The cursor must be this many coin-widths away to reach the maximum tilt. */
export const TILT_RANGE = 2.2;

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

export interface TiltRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * The target `rotateX` and `rotateY` in degrees for a cursor at `pointer`
 * (client coordinates), relative to the coin's bounding box.
 */
export function coinTilt(
  pointer: { x: number; y: number },
  rect: TiltRect,
): { x: number; y: number } {
  const dx = clamp(
    (pointer.x - (rect.left + rect.width / 2)) / (rect.width * TILT_RANGE),
  );
  const dy = clamp(
    (pointer.y - (rect.top + rect.height / 2)) / (rect.height * TILT_RANGE),
  );
  // Normalise -0 to 0 so a centred cursor reads as no tilt.
  return { x: -dy * MAX_TILT + 0, y: dx * MAX_TILT + 0 };
}

/** Tilt amplitude in degrees for the touch-device orbit. */
export const ORBIT_TILT = 12;
/** Time in ms for one full lap of the touch-device orbit. */
export const ORBIT_PERIOD = 7000;

/**
 * The coin's tilt at `ms` on touch devices, which have no cursor to follow:
 * the rim leans around in a slow circle, so the face sweeps through every
 * direction and never flips.
 */
export function coinOrbit(
  ms: number,
  amplitude = ORBIT_TILT,
  period = ORBIT_PERIOD,
): { x: number; y: number } {
  const a = (ms / period) * Math.PI * 2;
  return { x: Math.sin(a) * amplitude, y: Math.cos(a) * amplitude };
}
