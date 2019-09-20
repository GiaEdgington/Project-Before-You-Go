import React from 'react';
import Book from '../components/Book'

const BookDisplay = (props) => {

    const displayBooks = props.bookTitles.map(book => {
        return <Book key={book.id} book={book} destination_id={props.destination_id}
        />
    })

    return (
        <div className="container">
            { props.bookTitles.length > 0 
            ?
            <h2 className="listClass">List of Books</h2>
            :
            <div></div>
            }
            <div className="bookList ">
            {displayBooks}
            </div>
            
        </div>
        );
};

export default BookDisplay;