import React from 'react';

class Book extends React.Component {
    state = {
        title: "",
        authors: [],
        image: "",
        synopsis: "",
        isHidden: true,
        added: false,
        destination: ''
    }

    componentDidMount() {
        this.fetchBooks();
    }

    //fetch for book info, update state
    fetchBooks = () => {
        const key2 = 'AIzaSyCUZDVxJS93fWmpk3QKfscn15qz7segx-4';
        const key1 = 'AIzaSyCH0tIhWJCGZf1HFjw_hRFlJ0vlNuLVtf8';

        fetch(`https://www.googleapis.com/books/v1/volumes?q=+title:${this.props.book}&maxResults=1&key=${key1}`)
        .then(response => response.json())
        .then(response => {
            let title = typeof response.items[0].volumeInfo.title == "undefined" ? "" : response.items[0].volumeInfo.title;
            let authors = typeof response.items[0].volumeInfo.authors == "undefined" ? "" : response.items[0].volumeInfo.authors;
            let image = typeof response.items[0].volumeInfo.imageLinks == "undefined" ? "" : response.items[0].volumeInfo.imageLinks.smallThumbnail;
            let synopsis = typeof response.items[0].volumeInfo.description == "undefined" ? "Information not available." : response.items[0].volumeInfo.description;

            this.setState({ title: title,
                            authors: authors,
                            image: image,
                            synopsis: synopsis,
                            finished: true
                         });
        });
    };

    //book details
    handleClick = () => {
        this.setState({ isHidden: !this.state.isHidden})
    };

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
        });  

    };

    render(){
        return (
            <div className="flex-item" >
                { this.state.image == "" 
                ?
                 <div style={{ width:'130px',height:'200px',border:'1px black solid',backgroundColor:'white'}}>
                     <p style={{ padding:'1em', fontWeight:'bolder', fontSize:'1em'}}>{this.state.title}</p>
                </div>
                 :
                 <img src={this.state.image} style={{ width:'130px'}} alt="" />
                }
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
                { !this.state.isHidden && this.state.synopsis != ""
                ? 
                <div className="synopsis"><h4>{this.state.title}</h4><p>{this.state.synopsis}</p></div>
                :
                <p></p>
                }
            </div>
        )
    }
}

export default Book;