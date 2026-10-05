import { tableConfig } from "./engine";
import { cushionSegments } from "./geometry";

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
