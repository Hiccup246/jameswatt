import CreditsSection from "./CreditsSection";
import renderer from "react-test-renderer";

describe("CreditsSection", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<CreditsSection />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
