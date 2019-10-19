import React from 'react';
import BookDisplay from '../containers/BookDisplay';

class Form extends React.Component {

    destinationSearch = ""

    state = {
        destination: "Your destination",
        destination_id: null,
        books:[],
        message: "",
        notFound: null
    }

    handleChange = (destination) => {
        this.destinationSearch = destination;
    }

    //find if destination exists
    getDestinations = () => {
        let user_id = this.props.id

        fetch(`http://localhost:3000/users/${user_id}`)
        .then(response => response.json())
        .then(response => this.addTrip(response))
    }

    //get user's destinations and post new one
    addTrip = (response) => { 

        let dests = []

        if (response.destinations) {
            dests = response.destinations.map(dest => dest.name)
        }

        if(!dests.includes(this.destinationSearch)){
            fetch('http://localhost:3000/destinations', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.destinationSearch,    
                    user_id: this.props.id
                })
            }).then(response => response.json())
            .then( response => this.setState({ destination: response.name, destination_id: response.id }))    
        } else {
            this.setState({ message: "destination exists"})
            let destination = response.destinations.find(dest => { return dest.name == this.destinationSearch })
            this.setState({ destination: destination.name, destination_id: destination.id })
        } 
    }


    //after search, set state with book titles, pass state to BookDisplay
    handleSubmit = (e) => {
        e.preventDefault()
        //console.log(this.destinationSearch);
        let destination = `Novels set in ${this.destinationSearch}`

        fetch(encodeURI(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:${destination}&cmlimit=18&origin=*`))
        .then(response => response.json())
        .then(data => {
            let books = [];
            data.query.categorymembers.forEach(book => { books.push(book.title)})
            this.setState({ books: books, notFound: books.length })
        })
    }

    render(){
        //console.log(this.state.books)
        return(
            <div className="searchContainer">
                <form onSubmit={this.handleSubmit} >
                <label>{this.state.destination}:</label><br/>
                <input type="text" placeholder="" name="destination" onChange={(e) => this.handleChange(e.target.value)} /><br/>
                <button className="buttonPage">Search for Books</button>
                </form>
                <button className="buttonPage" onClick={this.getDestinations}>Create Trip</button>
                {
                    this.state.message == "destination exists"
                    ?
                    <p>You already have a trip to this destination. Feel free to add some Books!</p>
                    :
                    <div></div>
                }
                { this.state.notFound == 0 ?
                    <p>No Books were found for this destination.</p>
                :
                <BookDisplay bookTitles={this.state.books} destination_id={this.state.destination_id} />
                }
            </div>
        )
    }
}

export default Form;