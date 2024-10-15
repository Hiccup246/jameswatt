import BookshelfSection, { bookStatusSorter } from "./BookshelfSection";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function headerRows(): number {
  return screen.getAllByRole("rowgroup", { hidden: true })[0].children.length;
}

describe("BookshelfSection", () => {
  it("renders correctly", () => {
    const { container } = render(<BookshelfSection />);

    expect(container).toMatchSnapshot();
  });

  it("renders the first 4 book rows by default", () => {
    render(<BookshelfSection />);

    expect(screen.getAllByRole("row").length - headerRows()).toBe(4);
  });

  it("renders the 'Show More' button", () => {
    render(<BookshelfSection />);

    const showMoreButton = screen.getByText("Show More");

    expect(showMoreButton).toBeInTheDocument();
  });

  describe("When a user clicks on the 'Show More' button", () => {
    beforeEach(async () => {
      render(<BookshelfSection />);
      await userEvent.click(screen.getByText("Show More"));
    });

    it("renders more than 4 books", () => {
      expect(screen.getAllByRole("row").length - headerRows()).toBeGreaterThan(
        4
      );
    });

    it("renders the 'Show Less' button", () => {
      expect(screen.getByText("Show Less")).toBeInTheDocument();
    });

    it("when the show less button is clicked only the first 4 book rows are rendered", async () => {
      await userEvent.click(screen.getByText("Show Less"));

      expect(screen.getAllByRole("row").length - headerRows()).toBe(4);
    });
  });
});

describe("bookStatusSorter", () => {
  const readingBook: Book = {
    name: "Book 1",
    author: "John",
    genre: "Fiction",
    status: "Reading",
    dateStarted: "",
    dateCompleted: "",
  };

  const readBook: Book = {
    name: "Book 2",
    author: "Alice",
    genre: "NonFiction",
    status: "read",
    dateStarted: "",
    dateCompleted: "",
  };

  it("returns -1 when the first book is being read and the second is not", () => {
    expect(bookStatusSorter(readingBook, readBook)).toBe(-1);
  });

  it("returns 0 when both books are being read", () => {
    expect(bookStatusSorter(readingBook, readingBook)).toBe(0);
  });

  it("returns 0 when both books are not being read", () => {
    expect(bookStatusSorter(readBook, readBook)).toBe(0);
  });

  it("returns 1 when the first book is completed and the second is being read", () => {
    expect(bookStatusSorter(readingBook, readingBook)).toBe(0);
  });
});
