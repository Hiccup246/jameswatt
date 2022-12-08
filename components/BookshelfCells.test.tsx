import { expect, test } from "@jest/globals";
import BookshelfCells from "./BookshelfCells";
import renderer from "react-test-renderer";

const dummyBook: Book = {
  name: "The Black Swan: The Impact of the Highly Improbable",
  author: "Nassim Nicholas Taleb",
  genre: "Nonfiction",
  status: "Reading",
  dateStarted: "26/09/2022",
  dateCompleted: "",
};

test("renders the BookshelfCells correctly", () => {
  const tree = renderer.create(<BookshelfCells book={dummyBook} />).toJSON();

  expect(tree).toMatchSnapshot();
});
