import { expect, it } from "@jest/globals";
import FooterSection from "./FooterSection";
import renderer from "react-test-renderer";

it("renders the FooterSection correctly", () => {
  const tree = renderer.create(<FooterSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
