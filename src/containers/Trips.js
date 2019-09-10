import React from 'react';
import Destination from '../components/Destination'


class Trips extends React.Component {  //pass user ID here

    state = {
        myDestinations: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/users/4')
        .then(response => response.json())
        .then(response => {
            this.setState({ myDestinations: response.destinations});
        }) 
    }

    render(){
        //console.log(this.state.myTrips)
        const userTrips = this.state.myDestinations.map(dest => {
            return <Destination key={dest.id} dest={dest}/>
        })
        return(
            <div>
                <h1>My Trips</h1>
                {userTrips}
            </div>
        )
    }
}


export default Trips;