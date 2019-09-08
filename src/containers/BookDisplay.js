import React from 'react';
import Book from '../components/Book'

const BookDisplay = (props) => {
        //console.log(props)
        //map array of books, creates Book component
    const displayBooks = props.bookTitles.map(book => {
        return <Book key={book.id} book={book} destination_id={props.destination_id} 
        />
    })

    return (
        <div className="container">
            <h1>LIST OF BOOKS</h1>
            <div className="bookList">
            {displayBooks}
            </div>
            
        </div>
        );
};

export default BookDisplay;