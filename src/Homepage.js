import React from 'react';
import Form from './components/Form';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {

    state = {
        trips: -1
    }

    signOut = () => {
        localStorage.clear();
        //needs props history to /
        this.props.history.push('/');
    }

    numTrips = () => {
        //console.log(this.props.id);
        if (this.props.id != null) {
            fetch(`https://before-you-go.herokuapp.com/users/${this.props.id}`)
            .then(response => response.json())
            .then((response) => {
                this.setState({ trips: response.destinations.length })
            })
        }
    }
    render(){
        console.log(this.props);
        if (this.state.trips < 0) {
            this.numTrips();
        } 
        return(
            <div className='homepage'>
                <div style={{ float:"right",marginRight:"7em"}}>
                    <Link to = "/myTrips"><button className="buttonPage" style={{ marginRight:'5px'}}>My Trips<span className="counter">{this.state.trips < 0 ? <span>0</span> : this.state.trips }</span></button></Link>
                    
                    <button className="buttonPage" onClick={this.signOut}>Sign out</button>
                    <p>Welcome, {this.props.username}.</p>
                </div>
                <Form id={ this.props.id }/> 
            </div>
        )
    }
}

export default Homepage;