import React from 'react';
import DestinationBook from './DestinationBook';


class Destination extends React.Component {

    state={
        destBooks: [],
        isHidden: true
    }

    handleToggle= (id) => {
        //console.log(id)
       fetch(`https://beforeyougo.herokuapp.com/destinations/${id}`)
       .then(response => response.json())
       .then(response => {
           this.setState({ destBooks: response.books, isHidden: !this.state.isHidden})
        })
    }

    deleteBook = (id) => {
        fetch(`https://beforeyougo.herokuapp.com/books/${id}`, {
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