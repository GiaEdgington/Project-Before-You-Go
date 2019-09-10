import React from 'react';
import Form from './components/Form';

class Homepage extends React.Component {

    state = {
        username: ""
    }

    componentDidMount(){
        fetch('http://localhost:3000/homepage', {
            headers: {
                Authorization: localStorage.token
            }
        })
        .then(res => res.json())
        .then(profileData => {
           this.setState({ username: profileData.username})
        })
    }
 
    render(){
        return(
            <div>
                <p>Welcome, {this.state.username}.</p>
                <Form />
            </div>
        )
    }
}

export default Homepage;