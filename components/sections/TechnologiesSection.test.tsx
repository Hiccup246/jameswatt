import TechnologiesSection from "./TechnologiesSection";
import renderer from "react-test-renderer";

describe("TechnologiesSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TechnologiesSection />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
