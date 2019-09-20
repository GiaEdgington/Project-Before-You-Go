import React from 'react';

class Book extends React.Component {
    state = {
        title: "",
        authors: [],
        image: "",
        synopsis: "",
        show: false,
        added: false
    }

    //fetch for book info, saves details on state
    componentDidMount() {

        const key2 = 'AIzaSyCUZDVxJS93fWmpk3QKfscn15qz7segx-4'
        const key1 = 'AIzaSyCH0tIhWJCGZf1HFjw_hRFlJ0vlNuLVtf8'

        fetch(`https://www.googleapis.com/books/v1/volumes?q=+title:${this.props.book}&maxResults=1&key=${key1}`)
        .then(response => response.json())
        .then(response => {

            let title = typeof response.items[0].volumeInfo.title == "undefined" ? "" : response.items[0].volumeInfo.title;
            let authors = typeof response.items[0].volumeInfo.authors == "undefined" ? "" : response.items[0].volumeInfo.authors;
            let image = typeof response.items[0].volumeInfo.imageLinks == "undefined" ? "" : response.items[0].volumeInfo.imageLinks.smallThumbnail;
            let synopsis = typeof response.items[0].volumeInfo.description == "undefined" ? "" : response.items[0].volumeInfo.description;

            this.setState({ title: title,
                            authors: authors,
                            image: image,
                            synopsis: synopsis,
                            finished: true
                         })
        })
    }

    //set state show to true, for details on book
    handleClick = () => {
        this.setState({ show: true})
    }

    //saves book
    //find if destination already exists
    addBook = () => {

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
        .then(() => {
            //should look at response and confirm trip was added. this is temporary
            this.setState({added: true})
        }) 

    }
    
    render(){
        //console.log(this.props)
        return (
            <div className="flex-item" >
                {/* <p style={{ width:'150px'}}>{this.state.title}</p> */}
                <img src={this.state.image} alt="" />
                <button onClick={this.handleClick} className="buttonPage">Learn more</button>
                { this.props.destination_id && !this.state.added
                ?
                <button className="buttonPage" onClick={this.addBook}>Add Book</button>
                :
                <div>
                    { this.state.added
                    ?
                    <p>Book has been added!</p>
                    :
                    <div></div>
                    }
                </div>
                }
                { this.state.show
                ? 
                <div className="synopsis"><p>{this.state.synopsis}</p></div>
                :
                <div></div>
                }
            </div>
        )
    }
}

export default Book;