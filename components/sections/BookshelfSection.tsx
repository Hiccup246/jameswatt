import { useState } from "react";
import { BOOKS } from "../../constants/Books";
import BookShelfTable from "../BookshelfTable";
import SectionLayout from "../layouts/SectionLayout";

export function bookStatusSorter(a: Book, b: Book): number {
  if (a.status == "Reading" && b.status != "Reading") return -1;
  if (a.status != "Reading" && b.status == "Reading") return 1;

  return 0;
}

const sortedBooks = BOOKS.slice().sort(bookStatusSorter);

export default function BookshelfSectionTwo() {
  const [showAllBooks, setshowAllBooks] = useState(false);

  return (
    <SectionLayout bgSecondary>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Books I&apos;m Involved With
      </h1>

      <div className="rounded-xl p-3.5">
        <div className="max-h-[600px] overflow-y-scroll pr-2">
          <BookShelfTable
            books={sortedBooks}
            shortViewBooks={4}
            shortView={!showAllBooks}
          />
        </div>

        <button
          aria-label={showAllBooks ? "Show Less Books" : "Show More Books"}
          className="mx-auto mt-8 block w-fit rounded-md border px-2 py-1 hover:opacity-50"
          onClick={() => setshowAllBooks(!showAllBooks)}
        >
          {showAllBooks ? "Show Less" : "Show More"}
        </button>
      </div>
    </SectionLayout>
  );
}
