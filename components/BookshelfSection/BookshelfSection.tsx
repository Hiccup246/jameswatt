import React, { useState } from 'react'

import { BOOKS } from '../../constants/Books'
import SectionLayout from "../SectionLayout";

// import './bookshelf.css'
import BookshelfRow from './BookshelfRow';
export default function BookshelfSection() {
    const previewBooks = 4

    const renderBooks = (numberOfBooks: number) => {
        return BOOKS.slice(0, numberOfBooks).map((book: Book, index) => {
            return <BookshelfRow key={index} book={book} />
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

            <div className="bookshelf__table-wrapper">
                <table className="bookshelf__table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th className="bookshelf__genre-header">Genre</th>
                            <th className="bookshelf__status-header">Status</th>
                        </tr>
                    </thead>
                    <tbody>{books}</tbody>
                </table>

                <button
                    aria-label="Show More Books"
                    className="bookshelf__show-more-button"
                    onClick={() => showHideBooks()}
                >
                    {buttonText}
                </button>
            </div>
        </SectionLayout>
    )
};
