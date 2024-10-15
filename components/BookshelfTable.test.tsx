import BookshelfTable from "./BookshelfTable";
import { render, screen } from "@testing-library/react";

const headerRows = 1;
const mockBooks: Book[] = [
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

describe("BookshelfSection", () => {
  Object.defineProperty(document, "documentElement", {
    configurable: true,
    value: document.createElement("document"),
  });

  it("correctly renders all books", () => {
    const { container } = render(<BookshelfTable books={mockBooks} />);

    expect(container).toMatchSnapshot();
  });

  it("renders the correct table headers", () => {
    render(<BookshelfTable />);

    const bookHeader = screen.getByText("Book");
    const genreHeader = screen.getByText("Genre");
    const statusHeader = screen.getByText("Status");

    expect(bookHeader).toBeInTheDocument();
    expect(genreHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();
  });

  it("renders no books when none are given", () => {
    render(<BookshelfTable />);

    expect(screen.getAllByRole("row").length - headerRows).toBe(0);
  });

  it("renders shortViewBooks when shortView is true", () => {
    render(<BookshelfTable books={mockBooks} shortViewBooks={4} shortView />);

    expect(screen.getAllByRole("row").length - headerRows).toBe(4);
  });

  it("renders all books when shortViewBooks is set but shortView is false", () => {
    render(<BookshelfTable books={mockBooks} shortViewBooks={4} />);

    expect(screen.getAllByRole("row").length - headerRows).toBe(
      mockBooks.length
    );
  });

  it("renders no books when shortViewBooks is negative and shortView is true", () => {
    render(<BookshelfTable books={mockBooks} shortViewBooks={-1} shortView />);

    expect(screen.getAllByRole("row").length - headerRows).toBe(0);
  });
});
