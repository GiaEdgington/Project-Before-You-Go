import React from 'react';


class Book extends React.Component {
    state = {
        title: "",
        authors: [],
        image: "",
        synopsis: "",
        show: false,
    }
    //console.log(props)
    //const key = 'AIzaSyCH0tIhWJCGZf1HFjw_hRFlJ0vlNuLVtf8'
    
    descriptionholder = "";

    //fetch book info, saves details on state
    //need to get function out of componentDidMount
    componentDidMount() {
        let key2 = 'AIzaSyCUZDVxJS93fWmpk3QKfscn15qz7segx-4'

        fetch(`https://www.googleapis.com/books/v1/volumes?q=+title:${this.props.book}&maxResults=1&key=${key2}`)
        .then(response => response.json())
        .then(response => {
            this.setState({ title: response.items[0].volumeInfo.title,
                            authors: response.items[0].volumeInfo.authors,
                            image: response.items[0].volumeInfo.imageLinks.smallThumbnail,
                            synopsis: response.items[0].volumeInfo.description })
        })
    }

    //set state show to true, for details on book
    handleClick = () => {
        this.setState({ show: true})
    }

    //saves book
    //add image to saved book
    //review last then(console.log)
    //need to address books without info: image or description
    //was passing before title from destination state
    //review fetches
    //user cant add until logged in
    //find if destination already exists
    addBook = () => {
        //let travel = destination;
        //console.log(this.props.destination)

        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                author: this.state.authors.join(),
                image: this.state.image,
                synopsis: this.state.synopsis,
                destination_id: this.props.destination_id
            })
        }).then(response => response.json())
        .then(console.log)  


        //})
    }
    
    render(){

        return (
            <div className="bookDiv" >
                <p style={{ width:'150px'}}>{this.state.title}</p>
                <img src={this.state.image} alt="" />
                <p onClick={this.handleClick}>Learn more</p>
                { this.state.show
                ? 
                <div><p>{this.state.synopsis}</p>
                <button onClick={this.addBook}>Add to your Trip</button></div>
                :
                <div></div>
                }
            </div>
        )
    }
}

export default Book;