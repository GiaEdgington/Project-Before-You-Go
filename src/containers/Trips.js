import React from 'react';
import Destination from '../components/Destination';
import { Link } from 'react-router-dom';


class Trips extends React.Component {  //pass user ID here

    state = {
        myDestinations: [],
    }

    componentDidMount(){

        this.props.setUser().then(response => {
            this.setDestinations(response.id).then(destinationData => {
                this.setState({ myDestinations: destinationData.destinations, user_id: response.id})
            })
        })
    }

    setDestinations = async (id) => {

        let resp = await fetch(`http://localhost:3000/users/${id}`)
        let data = await resp.json()
        return data
    }

    removeTrip = (id) => {

        fetch(`http://localhost:3000/destinations/${id}`, {
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
        return(
            <div className="tripStyle"> 
                <div className="tripClass">
                    <Link className='link' to="/homepage">Go Back</Link>
                    <h3>My Trips</h3>
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