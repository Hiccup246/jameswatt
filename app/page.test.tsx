import { render } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders correctly on mobile", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
      })),
    });

    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });

  it("renders correctly on desktop/tablet", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
      })),
    });

    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
