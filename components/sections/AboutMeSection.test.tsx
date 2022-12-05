import { expect, it } from "@jest/globals";
import AboutMeSection from "./AboutMeSection";
import renderer from "react-test-renderer";

it("renders the AboutMeSection correctly", () => {
  const tree = renderer.create(<AboutMeSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
