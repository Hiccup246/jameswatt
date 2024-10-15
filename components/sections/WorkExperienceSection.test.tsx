import { render } from "@testing-library/react";
import WorkExperienceSection from "./WorkExperienceSection";

describe("WorkExperienceSection", () => {
  it("renders correctly on mobile", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
      })),
    });

    const { container } = render(<WorkExperienceSection />);

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

    const { container } = render(<WorkExperienceSection />);

    expect(container).toMatchSnapshot();
  });
});
