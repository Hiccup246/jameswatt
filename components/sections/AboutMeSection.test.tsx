import { expect, it } from "@jest/globals";
import AboutMeSection from "./AboutMeSection";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AboutMeSection></AboutMeSection>).toJSON();
  expect(tree).toMatchSnapshot();
});
