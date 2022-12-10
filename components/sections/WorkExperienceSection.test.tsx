import WorkExperienceSection from "./WorkExperienceSection";
import renderer from "react-test-renderer";

test("renders the WorkExperienceSection correctly", () => {
  const tree = renderer.create(<WorkExperienceSection />).toJSON();

  expect(tree).toMatchSnapshot();
});
