import IntroSection from "./IntroSection";
import renderer from "react-test-renderer";

describe("IntroSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<IntroSection />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
