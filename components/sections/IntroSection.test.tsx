import { expect, it } from "@jest/globals";
import IntroSection from "./IntroSection";
import renderer from "react-test-renderer";

it("renders the IntroSection correctly", () => {
  const tree = renderer.create(<IntroSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
