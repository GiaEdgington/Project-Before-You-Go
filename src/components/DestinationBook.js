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
            <div className="bookList">
                <div className="flex-item" >
                
                {/* <p style={{ width:'150px'}}>{this.props.title}</p> */}
                <img style={{ width:'130px'}} src={this.props.image} alt="" />
                <p style={{ marginBottom:'auto'}} onClick={this.handleClick}>Learn more</p>
                <div><button style={{ marginRight:'2px'}} onClick="">Remove</button><button onClick="">Buy</button></div>
                { this.state.show
                ? 
                <p>{this.props.synopsis}</p>
                :
                <div></div>
                }
                </div>
        </div>
        )
    }
}

export default DestinationBook;
