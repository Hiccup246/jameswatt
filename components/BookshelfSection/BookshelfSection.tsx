import React, { useState } from "react";
import { BOOKS } from "../../constants/Books";
import SectionLayout from "../SectionLayout";
import BookshelfRow from "./BookshelfRow";

export default function BookshelfSection() {
    const showLessBooks = 4;
    const [showAllBooks, setshowAllBooks] = useState(false);
    
    return (
        <SectionLayout>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-16">
                Books I&apos;m Involved With
            </h1>

            <div className="bg-white p-3.5 rounded-xl">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-sm pb-2.5 text-left text-black">Book</th>
                            <th className="text-sm pb-2.5 text-left text-black w-24 max-smaller:hidden">Genre</th>
                            <th className="text-sm pb-2.5 text-center text-black">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (showAllBooks ? BOOKS : BOOKS.slice(0, showLessBooks))
                                .map((book: Book) => {
                                    return (
                                        <tr key={book.name} className="[&>td]:pt-10 [&>td]:first:pt-0">
                                            <BookshelfRow book={book} />
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>

                <button
                    aria-label="Show More/Less Books"
                    className="border rounded-md px-2 py-1 mx-auto w-fit block hover:opacity-50 mt-8"
                    onClick={() => showAllBooks ? setshowAllBooks(false) : setshowAllBooks(true)}
                >
                    {showAllBooks ? "Show Less": "Show More"}
                </button>
            </div>
        </SectionLayout>
    )
};
