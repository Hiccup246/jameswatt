import { expect, it } from "@jest/globals";
import BookshelfSection from "./BookshelfSection";
import renderer from "react-test-renderer";

it("renders the BookshelfSection correctly", () => {
  const tree = renderer.create(<BookshelfSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
