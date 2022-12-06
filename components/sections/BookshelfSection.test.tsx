import { expect, it } from "@jest/globals";
import BookshelfSection from "./BookshelfSection";
import renderer from "react-test-renderer";

it("renders the BookshelfSection correctly", () => {
  const tree = renderer.create(<BookshelfSection />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a Show More button which when clicked displays all books", () => {
  const tree = renderer.create(<BookshelfSection />).toJSON();
});

it("When the Show More button is clicked it renders a Show Less button which when clicked shows less books", () => {

});