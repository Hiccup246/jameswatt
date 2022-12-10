import Image from "next/image";
import AnimatedBookBrown from "../public/animated-book-brown.gif";
import ReadBook from "../public/book.webp";

export default function BookShelfTable({
  books,
  shortViewBooks,
  shortView,
}: {
  books: Book[];
  shortViewBooks: number;
  shortView: boolean;
}) {
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
        src={AnimatedBookBrown}
        width={20}
        height={20}
        sizes="20px"
        alt="Currently Reading Icon"
      />
    </div>
  );

  shortViewBooks = shortViewBooks < 0 ? 0 : shortViewBooks;

  return (
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
        {(shortView ? books.slice(0, shortViewBooks) : books).map(
          (book: Book) => {
            return (
              <tr key={book.name} className="[&>td]:pt-10 [&>td]:first:pt-0">
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
  );
}
