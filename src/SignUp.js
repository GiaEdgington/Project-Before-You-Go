import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(console.log)
    }

    render(){
        //console.log(this.state.username)
        return (

            <div>
                <form onSubmit={this.handleSubmit} className="signup">
                    <label>Create Account</label><br/>
                    <input type="text" placeholder="username" name="username" onChange={this.handleChange}></input><br/>
                    <input type="text" placeholder="password" name="password" onChange={this.handleChange}></input><br/>
                    <button>Submit</button>
                    <p>or Sign in <Link to="/sign_in">here </Link></p>
                </form>
            </div>
        )
    }
}

export default SignUp;