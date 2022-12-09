import { useState } from "react";
import SectionLayout from "../layouts/SectionLayout";
import Image from "next/image";
import AnimatedBook from "../../public/animated-book.gif";
import ReadBook from "../../public/book.webp";

const showLessBooks = 4;

const completedBookIcon = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={ReadBook}
      width={20}
      height={20}
      sizes="20px"
      alt="Completed Book Icon"
    />
  </div>
);

const currentlyReadingIcon = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={AnimatedBook}
      width={20}
      height={20}
      sizes="20px"
      alt="Currently Reading Icon"
    />
  </div>
);

export default function BookshelfSection({ books }: { books: Book[] }) {
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
            {(showAllBooks ? books : books.slice(0, showLessBooks)).map(
              (book: Book) => {
                return (
                  <tr
                    key={book.name}
                    className="[&>td]:pt-10 [&>td]:first:pt-0"
                  >
                    <td className="flex flex-col justify-start break-keep pr-2.5 align-top">
                      <h2 className="my-0 max-w-lg font-bold">{book.name}</h2>
                      <div className="text-sm">{book.author}</div>
                    </td>

                    <td className="align-top text-sm max-smaller:inline">
                      {book.genre}
                    </td>

                    <td className="align-top">
                      {book.status == "Read"
                        ? completedBookIcon
                        : currentlyReadingIcon}
                    </td>
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
