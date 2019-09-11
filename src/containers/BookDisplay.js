import React from 'react';
import Book from '../components/Book'

const BookDisplay = (props) => {
        //map array of books, creates Book component
    const displayBooks = props.bookTitles.map(book => {
        return <Book key={book.id} book={book} destination_id={props.destination_id} 
        />
    })

    return (
        <div className="container">
            { props.bookTitles.length > 0 
            ?
            <h1>List of Books</h1>
            :
            <div></div>
            }
            <div className="bookList">
            {displayBooks}
            </div>
            
        </div>
        );
};

export default BookDisplay;