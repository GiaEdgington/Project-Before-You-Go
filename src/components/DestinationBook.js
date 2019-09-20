import React from 'react';


class DestinationBook extends React.Component {

    state={
        show: false,
        deleted: false
    }

    handleClick = () => {
        this.setState({ show: true })
    }
       
    render(){
        return(
            <div className="bookList">
                <div className="flex-item" >
                    <img style={{ width:'130px'}} src={this.props.book.image} alt="" />
                    <div>
                        <button onClick={this.handleClick} className="remButton">More</button>
                        <button className="remButton" onClick={() => this.props.deleteBook(this.props.book.id)}>Remove</button>
                    </div>
                    { this.state.show
                    ? 
                    <p className="synopsis">{this.props.book.synopsis}</p>
                    :
                    <div></div>
                    }
                </div>
        </div>
        )
    }
}

export default DestinationBook;
