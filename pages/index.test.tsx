import Home from "./index.page";
import renderer from "react-test-renderer";

test("renders the Home component correctly", () => {
  const tree = renderer.create(<Home />).toJSON();

  expect(tree).toMatchSnapshot();
});
