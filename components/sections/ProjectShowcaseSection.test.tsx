import { render } from "@testing-library/react";
import ProjectShowcaseSection from "./ProjectShowcaseSection";

describe("ProjectShowcaseSection", () => {
  it("renders correctly", () => {
    const { container } = render(<ProjectShowcaseSection />);

    expect(container).toMatchSnapshot();
  });
});
