import { expect, it } from "@jest/globals";
import WorkExperienceSection from "./WorkExperienceSection";
import renderer from "react-test-renderer";

it("renders the WorkExperienceSection correctly", () => {
  const tree = renderer.create(<WorkExperienceSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
