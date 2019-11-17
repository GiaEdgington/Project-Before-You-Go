import React from 'react';
import BookDisplay from '../containers/BookDisplay';

class Form extends React.Component {

    destinationSearch = "";

    state = {
        destination: "",
        destination_id: null,
        books:[],
        message: "",
        notFound: null
    }

    handleChange = (destination) => {
        this.setState({destination: destination});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let destination = `Novels set in ${this.state.destination}`
        
        fetch(encodeURI(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:${destination}&cmlimit=18&origin=*`))
        .then(response => response.json())
        .then(data => {
            let books = [];
            data.query.categorymembers.forEach(book => { books.push(book.title)})
            this.setState({ books: books, notFound: books.length })
        })
    }

    render(){
        //console.log(this.props);
        return(
            <div className="searchContainer">
                <form onSubmit={this.handleSubmit} >
                    <label>Your destination:</label><br/>
                    <input type="text" placeholder="" name="destination" onChange={(e) => this.handleChange(e.target.value)} /><br/>
                    {/* <button className="buttonPage" onClick={this.getDestinations}>Create Trip</button> */}
                    <button className="buttonPage">Search for Books</button>
                </form>
                
                {
                    this.state.message === "destination exists"
                    ?
                    <p>You already have a trip to this destination. Feel free to add some Books!</p>
                    :
                    <div></div>
                }
                { this.state.notFound === 0 ?
                    <p>No Books were found for this destination.</p>
                :
                <BookDisplay bookTitles={this.state.books} destination_id={this.state.destination_id} getDestinations={this.getDestinations} id={this.props.id} destination={this.state.destination} numTrips={this.props.numTrips}/>
                }
            </div>
        )
    }
}

export default Form;
