import FooterSection from "./FooterSection";
import renderer from "react-test-renderer";

describe("FooterSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<FooterSection />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
