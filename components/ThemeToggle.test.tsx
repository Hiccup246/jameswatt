import { expect, test } from "@jest/globals";
import ThemeToggle from "./ThemeToggle";
import renderer from "react-test-renderer";

test("renders the ThemeToggle correctly", () => {
  const tree = renderer.create(<ThemeToggle />).toJSON();

  expect(tree).toMatchSnapshot();
});
