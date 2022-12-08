import { expect, test } from "@jest/globals";
import Home from "./index";
import renderer from "react-test-renderer";

test("renders the Home component correctly", () => {
  const tree = renderer.create(<Home />).toJSON();

  expect(tree).toMatchSnapshot();
});
