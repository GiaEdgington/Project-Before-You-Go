import React from 'react';
import DestinationBook from './DestinationBook';
import { Link } from 'react-router-dom';

class Destination extends React.Component {

    state={
        destBooks: [],
        clicked: false,
        title: "",
        author: "",
        image: "",
        synopsis: ""
    }
    handleClick = (id) => {
        //console.log(id)
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
            //if destination has no books add message
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
                    <div className="myDestinations" onClick={() => this.handleClick(this.props.dest.id)}>
                    <h4 style={{ marginLeft:'2em'}}>{this.props.dest.name}</h4>
                    <Link className='link' to="/">Find more books</Link>
                        { this.state.clicked
                        ? 
                        getBooks
                        :
                        <div></div>
                        } 
                    </div>
                </div>
            )
        }
    }

export default Destination;