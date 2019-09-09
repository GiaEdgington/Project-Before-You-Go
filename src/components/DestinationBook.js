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
                <button style={{ float:"right",marginRight:"50px"}}>Go Back</button>
                <p style={{ width:'150px'}}>{this.props.title}</p>
                <img src={this.props.image} alt="" />
                <p onClick={this.handleClick}>Learn more</p>
                <button onClick="">Delete</button>
                { this.state.show
                ? 
                <p>{this.props.synopsis}</p>
                :
                <div></div>
                }
            </div>
        )
    }
}

export default DestinationBook;