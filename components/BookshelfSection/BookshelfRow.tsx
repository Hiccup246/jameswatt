import React from "react"
import Image from "next/image";

export default function BookshelfRow({ book }: { book: Book }) {
    function getBookStatusIcon(status: string) {
      if (status === "Read") {
        return (
          <div className="h-5 w-5 mx-auto">
             <Image src="/book.png"
                    width={48}
                    height={48}
                    sizes="(min-width: 640px) 48px,
                            (min-width: 785px) 48px,
                            48px"
                    alt="Completed Book Icon" />
          </div>
        )
      } else {
        return (
          <div className="h-5 w-5 mx-auto">
            <Image src="/animated-book.gif"
                   width={48}
                   height={48}
                   sizes="(min-width: 640px) 48px,
                          (min-width: 785px) 48px,
                          48px"
                   alt="Currently Reading Icon" />
            </div>
        )
      }
    }

    return (
        <>
          <td className="bookshelf__name-cell flex justify-start flex-col pr-2.5 break-keep align-top">
            <h3 className="my-0 max-w-lg font-bold">{book.name}</h3>
            <div className="text-sm">{book.author}</div>
          </td>
          <td className="bookshelf__genre-cell align-top text-sm max-smaller:inline">{book.genre}</td>
          <td className="bookshelf__status-cell align-top">
            {getBookStatusIcon(book.status)}
          </td>
        </>
      )
}