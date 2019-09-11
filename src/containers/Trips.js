import React from 'react';
import Destination from '../components/Destination'


class Trips extends React.Component {  //pass user ID here

    state = {
        myDestinations: []
    }

    componentDidMount(){
        let user_id = this.props.id

        fetch(`http://localhost:3000/users/${user_id}`)
        .then(response => response.json())
        .then(response => {
            //console.log(response.destinations)
            this.setState({ myDestinations: response.destinations});
        }) 
    }

    render(){
        //console.log(this.state.myDestinations)
         const userTrips = this.state.myDestinations.map(dest => {
            return <Destination key={dest.id} dest={dest}/>
         })
        return(
            <div>
                <h3 style= {{ marginLeft:'5em', marginTop:'5em' }}>My Trips</h3>
                {userTrips}
            </div>
        )
    }
}


export default Trips;