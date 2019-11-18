import React from 'react';
import Destination from '../components/Destination';
import { Link } from 'react-router-dom';


class Trips extends React.Component {  //pass user ID here

    state = {
        myDestinations: [],
        initialized: false
    }

    componentDidMount(){
            this.setDestinations();
    }

    setDestinations = () => {
        if (this.props.id != null) {
            fetch(`https://before-you-go.herokuapp.com/users/${this.props.id}`)
            .then(response => response.json())
            .then(destinationData => {
                this.setState({ myDestinations: destinationData.destinations, user_id: this.props.id, initialized: true });
            })
        }
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
        if(!this.state.initialized){
            this.setDestinations();
        }
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
                    this.state.initialized
                    ?
                    <p style={{ marginLeft:'11em', marginTop:'-3em', marginRigth:'0', fontSize:'1em'}}>You have no upcoming trips, {this.props.username}.</p>
                    :
                    <div></div>
                }
            </div>
        )
    }
}


export default Trips;