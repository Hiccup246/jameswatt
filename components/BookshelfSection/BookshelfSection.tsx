import React, { useState } from 'react'

import { BOOKS } from '../../constants/Books'
import SectionLayout from "../SectionLayout";

// import './bookshelf.css'
import BookshelfRow from './BookshelfRow';
export default function BookshelfSection() {
    const previewBooks = 4

    const renderBooks = (numberOfBooks: number) => {
        return BOOKS.slice(0, numberOfBooks).map((book: Book, index) => {
            return (
                <tr key={index} className="[&>td]:pt-10 [&>td]:first:pt-0">
                    <BookshelfRow book={book} />
                </tr>
            )
        })
    }

    const [buttonText, setButtonText] = useState('Show More')
    const [books, setBooks] = useState(renderBooks(previewBooks))

    const showHideBooks = () => {
        if (buttonText === 'Show More') {
            setBooks(renderBooks(BOOKS.length))
            setButtonText('Show Less')
        } else {
            setBooks(renderBooks(previewBooks))
            setButtonText('Show More')
        }
    }

    return (
        <SectionLayout isBgColorPrimary={true}>
            <h1 className="self-center text-2xl sm:text-3xl font-bold mb-14">
                Books I'm Involved With
            </h1>

            <div className="bookshelf__table-wrapper bg-white p-3.5 rounded-xl">
                <table className="bookshelf__table w-full">
                    <thead>
                        <tr>
                            <th className="text-sm pb-2.5 text-left text-black">Book</th>
                            <th className="bookshelf__genre-header text-sm pb-2.5 text-left text-black w-24 max-smaller:hidden">Genre</th>
                            <th className="bookshelf__status-header text-sm pb-2.5 text-center text-black">Status</th>
                        </tr>
                    </thead>
                    <tbody>{books}</tbody>
                </table>

                <button
                    aria-label="Show More Books"
                    className="bookshelf__show-more-button border rounded-md px-2 py-1 mx-auto w-fit block hover:opacity-50 mt-8"
                    onClick={() => showHideBooks()}
                    >
                    {buttonText}
                </button>
            </div>
        </SectionLayout>
    )
};
