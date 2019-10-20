import React from 'react';

class BookDetails extends React.Component {
    render(){

        return(
            <div className="bookDetails">
                <h3>{this.props.title}</h3>
                <img src={this.props.image}/>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default BookDetails;