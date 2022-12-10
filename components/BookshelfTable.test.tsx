import { expect, test } from "@jest/globals";
import BookshelfTable from "./BookshelfTable";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

const headerRows = 1;
const dummyBooks: Book[] = [
  {
    name: "The Black Swan: The Impact of the Highly Improbable",
    author: "Nassim Nicholas Taleb",
    genre: "Nonfiction",
    status: "Reading",
    dateStarted: "26/09/2022",
    dateCompleted: "",
  },
  {
    name: "The Pragmatic Programmer: From Journeyman to Master",
    author: "Andy Hunt, Dave Thomas",
    genre: "Programming",
    status: "Reading",
    dateStarted: "",
    dateCompleted: "",
  },
  {
    name: "Wordslut: A Feminist Guide to Taking Back the English Language",
    author: "Amanda Montell",
    genre: "Nonfiction",
    status: "Read",
    dateStarted: "12/09/2022",
    dateCompleted: "25/09/2022",
  },
  {
    name: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biography",
    status: "Read",
    dateStarted: "24/07/2022",
    dateCompleted: "11/09/2022",
  },
  {
    name: "Brave New World",
    author: "Aldous Huxley",
    genre: "Fiction",
    status: "Read",
    dateStarted: "",
    dateCompleted: "",
  },
  {
    name: "Modern Conspiracies in America: Separating Fact from Fiction",
    author: "Michael D. Gambone",
    genre: "Nonfiction",
    status: "Read",
    dateStarted: "",
    dateCompleted: "26/06/2022",
  },
];

test("renders the BookshelfSection correctly", () => {
  const tree = renderer
    .create(<BookshelfTable books={dummyBooks} shortViewBooks={4} shortView />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders the BookshelfTable header rows", () => {
  render(<BookshelfTable books={dummyBooks} shortViewBooks={4} shortView />);

  const bookHeader = screen.getByText("Book");
  const genreHeader = screen.getByText("Genre");
  const statusHeader = screen.getByText("Status");

  expect(bookHeader).toBeInTheDocument();
  expect(genreHeader).toBeInTheDocument();
  expect(statusHeader).toBeInTheDocument();
});

test("renders the shortViewBooks when shortView is true", () => {
  render(<BookshelfTable books={dummyBooks} shortViewBooks={4} shortView />);

  expect(screen.getAllByRole("row").length - headerRows).toBe(4);
});

test("renders all books when shortView prop is false", () => {
  render(
    <BookshelfTable books={dummyBooks} shortViewBooks={4} shortView={false} />
  );

  expect(screen.getAllByRole("row").length - headerRows).toBe(
    dummyBooks.length
  );
});

test("renders no books when the shortView prop is true and shortViewBooks is -1", () => {
  render(<BookshelfTable books={dummyBooks} shortViewBooks={-1} shortView />);

  expect(screen.getAllByRole("row").length - headerRows).toBe(0);
});
