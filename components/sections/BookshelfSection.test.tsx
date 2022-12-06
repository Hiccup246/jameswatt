import { expect, test, describe, beforeEach } from "@jest/globals";
import BookshelfSection from "./BookshelfSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    .create(<BookshelfSection books={dummyBooks} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders the BookshelfSection title and table header rows", () => {
  render(<BookshelfSection books={dummyBooks} />);

  const title = screen.getByText("Books I'm Involved With");
  const bookHeader = screen.getByText("Book");
  const genreHeader = screen.getByText("Genre");
  const statusHeader = screen.getByText("Status");

  expect(title).toBeInTheDocument();
  expect(bookHeader).toBeInTheDocument();
  expect(genreHeader).toBeInTheDocument();
  expect(statusHeader).toBeInTheDocument();
});

test("renders the first 4 book rows by default", () => {
  render(<BookshelfSection books={dummyBooks} />);

  expect(screen.getAllByRole("row").length - headerRows).toBe(4);
});

test("renders the 'Show More' button", () => {
  render(<BookshelfSection books={dummyBooks} />);

  expect(screen.getAllByRole("row").length - headerRows).toBe(4);
});

describe("When a user clicks on the 'Show More' button", () => {
  beforeEach(async () => {
    render(<BookshelfSection books={dummyBooks} />);
    await userEvent.click(screen.getByText("Show More"));
  });

  test("renders all book rows", () => {
    expect(screen.getAllByRole("row").length - headerRows).toBe(
      dummyBooks.length
    );
  });

  test("renders the 'Show Less' button", () => {
    expect(screen.getByRole("button")).toHaveTextContent("Show Less");
  });

  test("when the show less button is clicked only the first 4 book rows are rendered", async () => {
    await userEvent.click(screen.getByText("Show Less"));

    expect(screen.getAllByRole("row").length - headerRows).toBe(4);
  });
});
