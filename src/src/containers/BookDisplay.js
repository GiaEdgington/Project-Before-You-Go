import React from 'react';
import Book from '../components/Book'

class BookDisplay extends React.Component {

    render(){
        //console.log(this.props.bookTitles);
        const displayBooks = this.props.bookTitles.map(book => {
            return <Book key={book.id} book={book} destination_id={this.props.destination_id}/>
        })

        return (
            <div className="container">
                { this.props.bookTitles.length > 0 
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

    }
};

export default BookDisplay;