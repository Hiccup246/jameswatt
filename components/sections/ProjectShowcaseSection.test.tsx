import ProjectShowcaseSection from "./ProjectShowcaseSection";
import renderer from "react-test-renderer";

describe("ProjectShowcaseSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ProjectShowcaseSection />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
