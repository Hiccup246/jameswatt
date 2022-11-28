import React from 'react'

// import bookDark from '../../../assets/book-dark.gif'
// import bookLight from '../../../assets/book-light.gif'
// import Completed from '../../../assets/svg/clipboard-check.svg'

// import './bookshelf-row.css'

export default function BookshelfRow({ book }: { book: Book }) {

    function getBookStatusIcon(status: string) {
      if (status === 'Read') {
        // return <Completed className="bookshelf__completed" />
      } else {
        return (
          <img
            width="19px"
            height="19px"
            className="bookshelf__reading-icon"
            // src={siteTheme === 'dark' ? bookDark : bookLight}
            alt="Currently reading"
          />
        )
      }
    }

    return (
        <tr>
          <td className="bookshelf__name-cell">
            <h3>{book.name}</h3>
            <div>{book.author}</div>
          </td>
          <td className="bookshelf__genre-cell">{book.genre}</td>
          <td className="bookshelf__status-cell">
            {getBookStatusIcon(book.status)}
          </td>
        </tr>
      )
}