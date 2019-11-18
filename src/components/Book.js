import React from 'react';

class Book extends React.Component {
    state = {
        title: "",
        authors: [],
        image: "",
        synopsis: "",
        isHidden: true,
        added: false,
        destination: '',
        destination_id: null,
        message: ""
    }

    componentDidMount() {
        this.fetchBooks();
    }

    //fetch for book info, update state
    fetchBooks = () => {
        //const key2 = 'AIzaSyCUZDVxJS93fWmpk3QKfscn15qz7segx-4';
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

    //for book details
    handleClick = () => {
        this.setState({ isHidden: !this.state.isHidden})
    };

         //find if destination exists
         getDestinations = () => {
             //console.log(this.props.destination);
            let user_id = this.props.id
    
            fetch(`https://before-you-go.herokuapp.com/users/${user_id}`)
            .then(response => response.json())
            .then(response => this.addTrip(response))
        }
    
        //get user's destinations and post new one
        addTrip = (response) => { 
            let dests = [];
            if (response.destinations) {
                dests = response.destinations.map(dest => dest.name)
            }
    
            if(!dests.includes(this.props.destination)){
                fetch('https://before-you-go.herokuapp.com/destinations', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.props.destination,    
                        user_id: this.props.id
                    })
                }).then(response => response.json())
                .then( response => this.setState({ destination: response.name, destination_id: response.id }))    
            } else {
                let destination = response.destinations.find(dest => { return dest.name === this.props.destination })
                this.setState({ destination: destination.name, destination_id: destination.id })
            }
            //console.log(this.state.destination_id);
            this.props.numTrips();
            if(this.state.destination_id != null){
                this.getBooks();}
        }   

        getBooks = () => {
            //console.log(this.props.destination);
           fetch(`https://before-you-go.herokuapp.com/destinations/${this.state.destination_id}`)
           .then(response => response.json())
           .then(response => this.addBook(response))
       }

    //saving book
    addBook = (response) => {
        let books = [];
        if (response.books) {
            books = response.books.map(book => book.title)
        }
        
        if(!books.includes(this.state.title)){
            fetch('https://before-you-go.herokuapp.com/books', {
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
                    destination_id: this.state.destination_id
                })
            }).then(response => response.json())
            .then(() => {
                //should look at response and confirm trip was added. this is temporary
                this.setState({added: true})
            }); 
        } else {
            this.setState({ message: 'This book is already in your collection.'})
        }
        //add message book already in collection
        //look into this.props.destination_id
    };

    render(){
        //console.log(this.props.book)
        return (
            <div className="flex-item" >
                { this.state.image === "" 
                ?
                 <div style={{ width:'130px',height:'200px',border:'1px black solid',backgroundColor:'white'}}>
                     <p style={{ padding:'1em', fontWeight:'bolder', fontSize:'1em'}}>{this.state.title}</p>
                </div>
                 :
                 <img src={this.state.image} style={{ width:'130px'}} alt="" />
                }
                <button onClick={this.handleClick} className="buttonBook">Learn more</button>

                <button className="buttonBook" onClick={this.getDestinations}>Add Book</button>

                    { this.state.added
                    ?
                    <p>Book has been added!</p>
                    :
                    <div></div>
                    }
                    { this.state.message.length > 1 ? <p>{this.state.message}</p> : <p></p>}

                { !this.state.isHidden && this.state.synopsis !== ""
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