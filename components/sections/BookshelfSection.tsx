import { useState } from "react";
import { BOOKS } from "../../constants/Books";
import SectionLayout from "../layouts/SectionLayout";
import BookshelfCells from "../BookshelfCells";

const showLessBooks = 4;

export default function BookshelfSection() {
  const [showAllBooks, setshowAllBooks] = useState(false);

  return (
    <SectionLayout bgSecondary>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Books I&apos;m Involved With
      </h1>

      <div className="rounded-xl p-3.5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-2.5 text-left text-sm text-black">Book</th>
              <th className="w-24 pb-2.5 text-left text-sm text-black max-smaller:hidden">
                Genre
              </th>
              <th className="pb-2.5 text-center text-sm text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {(showAllBooks ? BOOKS : BOOKS.slice(0, showLessBooks)).map(
              (book: Book) => {
                return (
                  <tr
                    key={book.name}
                    className="[&>td]:pt-10 [&>td]:first:pt-0"
                  >
                    <BookshelfCells book={book} />
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        <button
          aria-label="Show More/Less Books"
          className="mx-auto mt-8 block w-fit rounded-md border px-2 py-1 hover:opacity-50"
          onClick={() => setshowAllBooks(!showAllBooks)}
        >
          {showAllBooks ? "Show Less" : "Show More"}
        </button>
      </div>
    </SectionLayout>
  );
}
