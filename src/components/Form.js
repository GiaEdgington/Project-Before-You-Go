import React from 'react';
import { Link } from 'react-router-dom';
import BookDisplay from '../containers/BookDisplay';
import DestinationDisplay from '../containers/DestinationDisplay';

class Form extends React.Component {

    destinationSearch = ""

    state = {
        destination: "Your Destination",
        destination_id: null,
        books:[],
        userDestinations: [],
        clicked: false
    }

    handleChange = (destination) => {
        this.destinationSearch = destination;
    }

    handleClick = () => {
        this.setState({ clicked: true })
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/4`)
        .then(response => response.json())
        .then(response => this.setState({userDestinations: response.destinations.map(dest => dest.name)}))
    }

    setDestination = () => {
        //this.setState({ tripTitle: this.state.destination })
        //console.log(this.destinationSearch)

        fetch('http://localhost:3000/destinations', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.destinationSearch,
                user_id: 4
            })
        }).then(response => response.json())
        .then( response => this.setState({ destination: response.name, destination_id: response.id}))
    }

    //set state with book titles, pass state to BookDisplay
    handleSubmit = (e) => {
        e.preventDefault()
        let destination = `Novels set in ${this.destinationSearch}`

        //console.log(destination)
        fetch(encodeURI(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:${destination}&cmlimit=3&origin=*`))
        .then(response => response.json())
        .then(data => {
            let books = [];
            data.query.categorymembers.forEach(book => { books.push(book.title)})

            this.setState({ books: books })
        })
    }

    render(){
        return(
            <div>
                <Link to = "/myTrips"><button style={{ float:"right",marginRight:'50px',marginTop:'20px'}}>My Trips</button></Link>
                <form onSubmit={this.handleSubmit}>
                <label>{this.state.destination}</label><br/>
                <input type="text" placeholder="destination" name="destination" onChange={(e) => this.handleChange(e.target.value)} /><br/>
                <button>Search for Books</button>
                </form>
                <button onClick={this.handleClick}>Create Trip</button>
                {/* //label not showing because of this */}
                {   this.state.clicked && this.state.userDestinations.includes(this.destinationSearch)
                    ? 
                    <DestinationDisplay />
                    :
                    this.setDestination()
                } 

                <BookDisplay bookTitles={this.state.books} destination_id={this.state.destination_id}
                />
            </div>
        )
    }
}

export default Form;