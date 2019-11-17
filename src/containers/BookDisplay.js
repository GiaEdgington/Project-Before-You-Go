import React from 'react';
import Book from '../components/Book'

class BookDisplay extends React.Component {


    render(){
        //console.log(this.props.bookTitles);
        const displayBooks = this.props.bookTitles.map(book => {
            return <Book key={book.id} book={book} destination_id={this.props.destination_id} getDestinations={this.props.getDestinations} id={this.props.id} destination={this.props.destination} numTrips={this.props.numTrips}/>
        })

        return (
            <div className="container">
                <div className="bookList ">
                {displayBooks}
                </div>
            </div>
            );

    }
};

export default BookDisplay;