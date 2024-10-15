import { render } from "@testing-library/react";
import IntroSection from "./IntroSection";

describe("IntroSection", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
      })),
    });
  });

  it("renders correctly", () => {
    const { container } = render(<IntroSection />);

    expect(container).toMatchSnapshot();
  });
});
