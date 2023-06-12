import Image from "next/image";
import AnimatedBookBlack from "../public/animated-book-black.gif";
import AnimatedBookWhite from "../public/animated-book-white.gif";
import ClipboardCheckedBlack from "../public/clipboard-checked-black.webp";
import ClipboardCheckedWhite from "../public/clipboard-checked-white.webp";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { BookStatus } from "../constants/Books";

const whiteClipboardChecked = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={ClipboardCheckedWhite}
      width={20}
      height={20}
      sizes="20px"
      alt="Completed Book Icon"
    />
  </div>
);

const blackClipboardChecked = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={ClipboardCheckedBlack}
      width={20}
      height={20}
      sizes="20px"
      alt="Completed Book Icon"
    />
  </div>
);

const whiteAnimatedBook = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={AnimatedBookWhite}
      width={20}
      height={20}
      sizes="20px"
      alt="Currently Reading Icon"
    />
  </div>
);

const blackAnimatedBook = (
  <div className="mx-auto h-5 w-5">
    <Image
      src={AnimatedBookBlack}
      width={20}
      height={20}
      sizes="20px"
      alt="Currently Reading Icon"
    />
  </div>
);

export default function BookShelfTable({
  books = [],
  shortViewBooks = 0,
  shortView = false,
}: {
  books?: Book[];
  shortViewBooks?: number;
  shortView?: boolean;
}) {
  const [clipboardCheckedIcon, setClipboardCheckedIcon] =
    useState<JSX.Element>();
  const [animatedBook, setAnimatedBook] = useState<JSX.Element>();
  const previewBooks = shortViewBooks < 0 ? 0 : shortViewBooks;
  const { siteTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    if (siteTheme == "dark") {
      setAnimatedBook(whiteAnimatedBook);
      setClipboardCheckedIcon(whiteClipboardChecked);
    } else {
      setAnimatedBook(blackAnimatedBook);
      setClipboardCheckedIcon(blackClipboardChecked);
    }
  }, [siteTheme]);

  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-brown dark:bg-darkgrey">
        <tr>
          <th className="pb-2.5 text-left text-sm">Book</th>
          <th className="w-24 pb-2.5 text-left text-sm max-smaller:hidden">
            Genre
          </th>
          <th className="pb-2.5 text-center text-sm">Status</th>
        </tr>
      </thead>
      <tbody>
        {(!!shortView ? books.slice(0, previewBooks) : books).map(
          (book: Book) => {
            return (
              <tr key={book.name} className="[&>td]:pt-10 [&>td]:first:pt-0">
                <td className="flex flex-col justify-start break-keep pr-2.5 align-top">
                  <h2 className="my-0 max-w-lg font-bold">{book.name}</h2>
                  <div className="flex flex-col">
                    <div className="text-sm">{book.author}</div>
                    <div
                      title={
                        book.status == BookStatus.Read
                          ? "Date Completed"
                          : "Date Started"
                      }
                      className="order-last text-sm max-smaller:order-first"
                    >
                      {book.dateCompleted || book.dateStarted}
                    </div>
                  </div>
                </td>

                <td className="align-top text-sm max-smaller:inline">
                  {book.genre}
                </td>

                <td className="align-top">
                  {book.status == BookStatus.Read
                    ? clipboardCheckedIcon
                    : animatedBook}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
