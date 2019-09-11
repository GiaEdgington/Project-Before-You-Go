import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    }
//pass handleLogin callback as props from parent component

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(userInfo => {
            if (userInfo.token) {
              localStorage.token = userInfo.token
              this.props.history.push('/')
            }
          })
    }

    render(){
        //console.log(this.state.username)
        return (

            <div>
                <form onSubmit={this.handleSubmit} className="signup">
                    <label>Log In</label><br/>
                    <input type="text" placeholder="username" name="username" onChange={this.handleChange}></input><br/>
                    <input type="text" placeholder="password" name="password" onChange={this.handleChange}></input><br/>
                    <button className="buttonPage">  Submit</button>
                    {/* <p>or Sign in <Link to="/sign_in">here </Link></p> */}
                </form>
            </div>
        )
    }
}

export default LoginForm;