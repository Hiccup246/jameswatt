import BookshelfSection from "./BookshelfSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const headerRows = 1;

test("renders the BookshelfSection correctly", () => {
  const tree = renderer.create(<BookshelfSection />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders the first 4 book rows by default", () => {
  render(<BookshelfSection />);

  expect(screen.getAllByRole("row").length - headerRows).toBe(4);
});

test("renders the 'Show More' button", () => {
  render(<BookshelfSection />);

  const showMoreButton = screen.getByText("Show More");

  expect(showMoreButton).toBeInTheDocument();
});

describe("When a user clicks on the 'Show More' button", () => {
  beforeEach(async () => {
    render(<BookshelfSection />);
    await userEvent.click(screen.getByText("Show More"));
  });

  test("renders more than 4 books", () => {
    expect(screen.getAllByRole("row").length - headerRows).toBeGreaterThan(4);
  });

  test("renders the 'Show Less' button", () => {
    expect(screen.getByText("Show Less")).toBeInTheDocument();
  });

  test("when the show less button is clicked only the first 4 book rows are rendered", async () => {
    await userEvent.click(screen.getByText("Show Less"));

    expect(screen.getAllByRole("row").length - headerRows).toBe(4);
  });
});
