import WorkExperienceSection from "./WorkExperienceSection";
import renderer from "react-test-renderer";

describe("WorkExperienceSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<WorkExperienceSection />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
