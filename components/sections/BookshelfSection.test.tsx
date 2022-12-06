import { expect, it, test } from "@jest/globals";
import BookshelfSection from "./BookshelfSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BOOKS } from "../../constants/Books";

const headerRows = 1;

it("renders the BookshelfSection correctly", () => {
  const tree = renderer.create(<BookshelfSection />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("does not render all books by default", async () => {
  render(<BookshelfSection />);

  expect(screen.getAllByRole("row").length).toBeLessThan(BOOKS.length - headerRows);
});

test("renders a show more button which when clicked displays all books", async () => {
  render(<BookshelfSection />);

  await userEvent.click(screen.getByText("Show More"));

  expect(screen.getAllByRole("row").length - headerRows).toBe(BOOKS.length);
});

test("renders a show less button after the show more button has been clicked which when clicked causes less books to be displayed", async () => {
  render(<BookshelfSection />);
  await userEvent.click(screen.getByText("Show More"));

  await userEvent.click(screen.getByText("Show Less"));

  expect(screen.getAllByRole("row").length).toBeLessThan(
    BOOKS.length - headerRows
  );
});
