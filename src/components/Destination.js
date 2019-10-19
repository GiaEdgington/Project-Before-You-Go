import React from 'react';
import DestinationBook from './DestinationBook';
import { Link } from 'react-router-dom';

class Destination extends React.Component {

    state={
        destBooks: [],
        isHidden: true
    }

    handleToggle= (id) => {
        //console.log(id)
       fetch(`http://localhost:3000/destinations/${id}`)
       .then(response => response.json())
       .then(response => {
           this.setState({ destBooks: response.books, isHidden: !this.state.isHidden})
        })
    }

    deleteBook = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then((response) => {
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
                <Link className='link' to="/homepage">Go Back</Link>
                <section className="myDestinations">
                    <details onToggle= {() => this.handleToggle(this.props.dest.id)}>
                    <summary className="tripTitle">{this.props.dest.name}</summary>
                    </details>
                <button onClick={ () => this.props.removeTrip(this.props.dest.id ) } className="delTrip">Delete Trip</button>
                    { !this.state.isHidden
                    ?
                    <div className="bookList">
                    {getBooks}
                    </div>
                    :
                    <div></div>
                    } 
                </section>
            </div>
        )
    }
}

export default Destination;