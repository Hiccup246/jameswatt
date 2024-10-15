import AboutMeSection from "./AboutMeSection";
import { render, screen } from "@testing-library/react";

describe("AboutMeSection", () => {
  const env = process.env;

  afterEach(() => {
    process.env = { ...env };
  });

  it("renders correctly", () => {
    const { container } = render(<AboutMeSection />);
    expect(container).toMatchSnapshot();
  });

  it("Copy email button copies AUTHOR_CONTACT_EMAIL env variable to clipboard", () => {
    process.env.NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL = "john@aol.com";
    const mockWriteText = jest.fn((_text) => {});
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
    });
    render(<AboutMeSection />);

    screen.getByRole("button").click();

    expect(mockWriteText).toHaveBeenCalledWith("john@aol.com");
  });
});
