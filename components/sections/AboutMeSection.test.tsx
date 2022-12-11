import AboutMeSection from "./AboutMeSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

describe("AboutMeSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AboutMeSection />).toJSON();
    expect(tree).toMatchSnapshot();
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
