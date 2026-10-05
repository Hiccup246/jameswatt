import { capTransform, discTransform } from "./ballPaint";

describe("capTransform", () => {
  it("hides a cap that is entirely on the far side", () => {
    expect(capTransform([0, 0, -1], 12)).toBeNull();
  });

  it("shows a cap that faces the viewer", () => {
    expect(capTransform([0, 0, 1], 12)).toContain("scale(");
  });
});

describe("discTransform", () => {
  it("hides the number when it faces away", () => {
    expect(
      discTransform({ n: [0, 0, -1], a: [1, 0, 0], t1: [1, 0, 0] }, 12),
    ).toBeNull();
  });

  it("offsets the disc towards its pole", () => {
    const t = discTransform({ n: [0, 0, 1], a: [1, 0, 0], t1: [1, 0, 0] }, 10);
    expect(t).toBe("matrix(1,0,0,1,0,0)");
  });
});
