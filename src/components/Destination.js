import React from 'react';
import DestinationBook from './DestinationBook';

class Destination extends React.Component {

    state={
        destBooks: [],
        clicked: false,
        title: "",
        author: "",
        image: "",
        synopsis: "",
    }
    handleClick = (id) => {
        console.log(id)
       fetch(`http://localhost:3000/destinations/${id}`)
       .then(response => response.json())
       .then(response => this.setState({ destBooks: response.books, clicked: true}))
    }

    showBooks = (response) => {
        this.setState({ 
            title:response.books[0].title, 
            authors:response.books[0].author, 
            image:response.books[0].image,
            synopsis: response.books[0].synopsis
         })
     }

        render(){
            const getBooks= this.state.destBooks.map(book => {
                return <DestinationBook key={book.id} book={book} 
                        dest={this.props.dest} 
                        showBooks={this.showBooks}
                        title={this.state.title}
                        author={this.state.author}
                        image={this.state.image}
                        synopsis={this.state.synopsis}
                />
            })

            return(
                <div>
                    <h4 onClick={() => this.handleClick(this.props.dest.id)}>{this.props.dest.name}</h4>
                    
                    { this.state.clicked
                    ? 
                    getBooks
                    :
                    <div></div>
                    } 
                </div>
            )
        }
    }
//<Link to="/bookInfo"><p>Learn more</p></Link>

export default Destination;