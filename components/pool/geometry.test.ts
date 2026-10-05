import { tableConfig, type RayResult } from "./engine";
import {
  cushionSegments,
  guideLines,
  placementKeyDelta,
  placementOverlay,
  tableLayout,
} from "./geometry";

const parse = (s: string) =>
  s.split(" ").map((p) => p.split(",").map(Number) as [number, number]);

describe("cushionSegments", () => {
  it("returns six segments with four-point bodies and two-point noses", () => {
    const segs = cushionSegments(tableConfig(false), true, 34);
    expect(segs).toHaveLength(6);
    for (const s of segs) {
      expect(parse(s.pts)).toHaveLength(4);
      expect(parse(s.nose)).toHaveLength(2);
    }
  });

  it("starts the first long-rail nose 1.6r from the corner, in board coordinates", () => {
    const cfg = tableConfig(false);
    const [first] = cushionSegments(cfg, true, 34);
    const [a, b] = parse(first.nose);
    expect(a[0]).toBeCloseTo(34 + cfg.r * 1.6, 1);
    expect(a[1]).toBeCloseTo(34, 1);
    // Ends 1.3r before the middle pocket.
    expect(b[0]).toBeCloseTo(34 + cfg.L / 2 - cfg.r * 1.3, 1);
  });

  it("puts the back edge 8px outside the felt and widens it by the jaw", () => {
    const cfg = tableConfig(false);
    const [first] = cushionSegments(cfg, true, 34);
    const body = parse(first.pts);
    expect(body[2][1]).toBeCloseTo(34 - 8, 1);
    expect(body[3][1]).toBeCloseTo(34 - 8, 1);
    expect(body[3][0]).toBeCloseTo(34 + cfg.r * 1.6 - 8.8, 1);
  });

  it("swaps axes for the portrait table", () => {
    const cfg = tableConfig(true);
    const [first] = cushionSegments(cfg, false, 20);
    const [a] = parse(first.nose);
    // u runs down the page on mobile, so the nose y starts at 1.6r.
    expect(a[0]).toBeCloseTo(20, 1);
    expect(a[1]).toBeCloseTo(20 + cfg.r * 1.6, 1);
  });
});

describe("tableLayout", () => {
  it("uses smaller furniture on the portrait table", () => {
    expect(tableLayout(true).coinDiameter).toBeLessThan(
      tableLayout(false).coinDiameter,
    );
  });
});

describe("guideLines", () => {
  const cue = { u: 100, v: 100 };
  const ball = { u: 300, v: 100 } as RayResult["hit"];

  it("returns only the aim line when no ball is hit", () => {
    const g = guideLines(cue, { t: 50, hit: null, gu: 150, gv: 100 }, 0, 960);
    expect(g.object).toBeNull();
    expect(g.deflect).toBeNull();
  });

  it("sends the object ball straight on and stops the cue ball dead", () => {
    const g = guideLines(cue, { t: 176, hit: ball, gu: 276, gv: 100 }, 0, 960);
    expect(g.object?.u2).toBeGreaterThan(300);
    expect(g.object?.v2).toBeCloseTo(100);
    expect(g.deflect).toBeNull();
  });

  it("deflects the cue ball on a cut shot", () => {
    const g = guideLines(cue, { t: 170, hit: ball, gu: 270, gv: 110 }, 0, 960);
    expect(g.deflect).not.toBeNull();
  });
});

describe("placementKeyDelta", () => {
  it("moves along the screen axes on the landscape table", () => {
    expect(placementKeyDelta("d", false, true)).toEqual({ du: 3, dv: 0 });
    expect(placementKeyDelta("a", false, true)).toEqual({ du: -3, dv: 0 });
    expect(placementKeyDelta("s", false, true)).toEqual({ du: 0, dv: 3 });
    expect(placementKeyDelta("w", false, true)).toEqual({ du: 0, dv: -3 });
  });

  it("swaps the axes on the portrait table", () => {
    // Screen right is across the table (v); screen down is along it (u).
    expect(placementKeyDelta("d", false, false)).toEqual({ du: 0, dv: 3 });
    expect(placementKeyDelta("s", false, false)).toEqual({ du: 3, dv: 0 });
  });

  it("takes bigger steps with Shift and ignores case", () => {
    expect(placementKeyDelta("D", true, true)).toEqual({ du: 12, dv: 0 });
  });

  it("returns null for other keys", () => {
    expect(placementKeyDelta("ArrowLeft", false, true)).toBeNull();
    expect(placementKeyDelta(" ", false, true)).toBeNull();
  });
});

describe("placementOverlay", () => {
  it("sizes the kitchen to a quarter of the table and the ring to 3.4r", () => {
    const cfg = tableConfig(false);
    expect(placementOverlay(cfg, true)).toEqual({
      kitchenW: 240,
      kitchenH: 480,
      ringDiameter: 12 * 3.4,
    });
  });

  it("turns the kitchen on its side for the portrait table", () => {
    const cfg = tableConfig(true);
    expect(placementOverlay(cfg, false)).toEqual({
      kitchenW: 300,
      kitchenH: 145,
      ringDiameter: 9 * 3.4,
    });
  });
});
