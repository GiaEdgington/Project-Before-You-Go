import React from 'react';


class DestinationBook extends React.Component {

    state={
        show: false
    }

    handleClick = () => {
        this.setState({ show: true })
    }

    //need to save book image -- modify books table
    //fetch user books

    componentDidMount(){
        fetch(`http://localhost:3000/destinations/${this.props.dest.id}`)
       .then(response => response.json())
       .then(response => this.props.showBooks(response)) 
    }
       
    render(){
        return(
            <div className="bookDiv" >
                <p style={{ width:'150px'}}>{this.props.title}</p>
                <img src={this.props.image} alt="" />
                <p onClick={this.handleClick}>Learn more</p>
                { this.state.show
                ? 
                <div><p>{this.props.synopsis}</p>
                <button onClick="">Delete</button></div>
                :
                <div></div>
                }
            </div>
        )
    }
}

export default DestinationBook;