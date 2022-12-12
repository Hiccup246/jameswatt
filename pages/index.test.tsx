import Home from "./index.page";
import renderer from "react-test-renderer";

describe("Home", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Home />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
