import { render, screen } from "@testing-library/react";
import PoolHero from "./PoolHero";

describe("PoolHero", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("renders the closed coin without a play hint", () => {
    render(<PoolHero />);

    expect(
      screen.getByRole("button", { name: "Open pool game" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Click me to play")).not.toBeInTheDocument();
  });

  // Regression: `perspective` only applies to direct children, so a plain
  // wrapper (the button) between it and the rotating coin flattens the tilt
  // into a symmetric squash with no sense of direction.
  it("puts the perspective directly around the rotating 3D coin", () => {
    render(<PoolHero />);

    const button = screen.getByRole("button", { name: "Open pool game" });
    const perspective = button.firstElementChild as HTMLElement;
    const coin = perspective.firstElementChild as HTMLElement;

    expect(perspective.style.perspective).toBe("700px");
    expect(coin.style.transformStyle).toBe("preserve-3d");
  });
});
