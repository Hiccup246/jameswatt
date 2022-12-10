import { useState } from "react";
import { BOOKS } from "../../constants/Books";
import BookShelfTable from "../BookshelfTable";
import SectionLayout from "../layouts/SectionLayout";

export default function BookshelfSectionTwo() {
  const [showAllBooks, setshowAllBooks] = useState(false);

  return (
    <SectionLayout bgSecondary>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Books I&apos;m Involved With
      </h1>

      <div className="rounded-xl p-3.5">
        <BookShelfTable
          books={BOOKS}
          shortViewBooks={4}
          shortView={!showAllBooks}
        />

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
