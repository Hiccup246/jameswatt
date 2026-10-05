import { MAX_TILT, TILT_RANGE, coinTilt } from "./coinTilt";

// A 180px coin centred at (500, 400).
const rect = { left: 410, top: 310, width: 180, height: 180 };
const centre = { x: 500, y: 400 };

describe("coinTilt", () => {
  it("does not tilt with the cursor on the coin's centre", () => {
    expect(coinTilt(centre, rect)).toEqual({ x: 0, y: 0 });
  });

  it("turns toward a cursor on the right: rotateY positive, rotateX flat", () => {
    const t = coinTilt({ x: centre.x + 100, y: centre.y }, rect);
    expect(t.y).toBeGreaterThan(0);
    expect(t.x).toBe(0);
  });

  it("turns toward a cursor on the left: rotateY negative", () => {
    expect(coinTilt({ x: centre.x - 100, y: centre.y }, rect).y).toBeLessThan(
      0,
    );
  });

  it("turns toward a cursor below: rotateX negative, rotateY flat", () => {
    const t = coinTilt({ x: centre.x, y: centre.y + 100 }, rect);
    expect(t.x).toBeLessThan(0);
    expect(t.y).toBe(0);
  });

  it("turns toward a cursor above: rotateX positive", () => {
    expect(
      coinTilt({ x: centre.x, y: centre.y - 100 }, rect).x,
    ).toBeGreaterThan(0);
  });

  it("scales with distance up to the maximum", () => {
    const near = coinTilt({ x: centre.x + 50, y: centre.y }, rect).y;
    const far = coinTilt({ x: centre.x + 150, y: centre.y }, rect).y;
    expect(far).toBeGreaterThan(near);
    expect(far).toBeLessThanOrEqual(MAX_TILT);
  });

  it("reaches the maximum at TILT_RANGE coin widths and clamps beyond", () => {
    const atRange = coinTilt(
      { x: centre.x + rect.width * TILT_RANGE, y: centre.y },
      rect,
    );
    expect(atRange.y).toBeCloseTo(MAX_TILT, 5);
    const far = coinTilt({ x: centre.x + 5000, y: centre.y - 5000 }, rect);
    expect(far).toEqual({ x: MAX_TILT, y: MAX_TILT });
  });

  it("combines both axes for a diagonal cursor", () => {
    const t = coinTilt({ x: centre.x + 100, y: centre.y + 100 }, rect);
    expect(t.y).toBeGreaterThan(0);
    expect(t.x).toBeLessThan(0);
    expect(Math.abs(t.x)).toBeCloseTo(t.y, 5);
  });
});
