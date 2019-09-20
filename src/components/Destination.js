import React from 'react';
import DestinationBook from './DestinationBook';
import { Link } from 'react-router-dom';

class Destination extends React.Component {

    state={
        destBooks: [],
        clicked: false
    }

    handleClick = (id) => {
        //console.log(id)
       fetch(`http://localhost:3000/destinations/${id}`)
       .then(response => response.json())
       .then(response => this.setState({ destBooks: response.books, clicked: true}))
    }

    deleteBook = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then((response) => {
            //console.log(response)
            //this.setState({ deleted: true})
            this.handleClick(this.props.dest.id)
        })
    }

    render(){
        //if destination has no books add message
        //state not updated when rerenders
        const getBooks= this.state.destBooks.map(book => {
            return <DestinationBook key={book.id} book={book} dest={this.props.dest} deleteBook={this.deleteBook}
            />
        })

        return(
            <div>
                <div className="myDestinations" onClick={() => this.handleClick(this.props.dest.id)}>
                <h4 className="tripTitle">{this.props.dest.name}</h4>
                <Link className='link' to="/homepage">Go Back</Link>
                <button onClick={ () => this.props.removeTrip(this.props.dest.id ) } className="delTrip">Delete Trip</button>
                    { this.state.clicked
                    ?
                    <div className="bookList">
                    {getBooks}
                    </div>
                    :
                    <div></div>
                    } 
                </div>
            </div>
        )
    }
}

export default Destination;