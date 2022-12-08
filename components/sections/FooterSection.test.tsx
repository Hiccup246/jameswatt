import { expect, test } from "@jest/globals";
import FooterSection from "./FooterSection";
import renderer from "react-test-renderer";

test("renders the FooterSection correctly", () => {
  const tree = renderer.create(<FooterSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
