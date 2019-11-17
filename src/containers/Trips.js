import React from 'react';
import Destination from '../components/Destination';
import { Link } from 'react-router-dom';


class Trips extends React.Component {  //pass user ID here

    state = {
        myDestinations: []
    }

    componentDidMount(){
        //this.props.setUser().then(response => {
            //console.log(this.props.id)
            this.setDestinations();
        //})
    }

    setDestinations = () => {
        fetch(`https://before-you-go.herokuapp.com/users/${this.props.id}`)
        .then(response => response.json())
        .then(destinationData => {
            this.setState({ myDestinations: destinationData.destinations, user_id: this.props.id});
        })
    }

    removeTrip = (id) => {
        fetch(`https://before-you-go.herokuapp.com/destinations/${id}`, {
            method:'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            this.componentDidMount();
        })
     }

    render(){
        const userTrips = () => {
            if (this.state.myDestinations) {
                return this.state.myDestinations.map(dest => {
                    return <Destination key={dest.id} dest={dest} removeTrip={this.removeTrip} />
                })
            }
        }
        //console.log(this.props.id)
        return(
            <div className="tripStyle"> 
                <div className="tripClass">
                    <Link to="/homepage" className='link'>GO BACK</Link>
                    <h3>MY TRIPS</h3>
                </div>
                
                <hr></hr>
                {
                    this.state.myDestinations.length > 0 
                    ?
                    userTrips()
                    :
                    <p style={{ marginLeft:'9em', fontSize:'1em'}}>No upcoming trips.</p>
                }
            </div>
        )
    }
}


export default Trips;