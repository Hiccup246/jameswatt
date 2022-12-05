import { expect, it } from "@jest/globals";
import CreditsSection from "./CreditsSection";
import renderer from "react-test-renderer";

it("renders the CreditsSection correctly", () => {
  const tree = renderer.create(<CreditsSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
