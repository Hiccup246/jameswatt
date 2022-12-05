import { expect, it } from "@jest/globals";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import renderer from "react-test-renderer";

it("renders the ProjectShowcaseSection correctly", () => {
  const tree = renderer.create(<ProjectShowcaseSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
