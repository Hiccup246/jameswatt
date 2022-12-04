import Image from "next/image";
import AnimatedBook from "../public/animated-book.gif";
import ReadBook from "../public/book.webp";

export default function BookshelfCells({ book }: { book: Book }) {
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

  return (
    <>
      <td className="flex flex-col justify-start break-keep pr-2.5 align-top">
        <h2 className="my-0 max-w-lg font-bold">{book.name}</h2>
        <div className="text-sm">{book.author}</div>
      </td>

      <td className="align-top text-sm max-smaller:inline">{book.genre}</td>

      <td className="align-top">
        {book.status == "Read" ? completedBookIcon : currentlyReadingIcon}
      </td>
    </>
  );
}