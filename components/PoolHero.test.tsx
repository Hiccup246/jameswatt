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
});
