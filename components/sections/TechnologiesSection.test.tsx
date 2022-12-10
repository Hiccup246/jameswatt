import TechnologiesSection from "./TechnologiesSection";
import renderer from "react-test-renderer";

it("renders the TechnologiesSection correctly", () => {
  const tree = renderer.create(<TechnologiesSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
