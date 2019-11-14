import React from 'react';

class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        error: false
    }
//pass handleLogin callback as props from parent component

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
        localStorage.username = this.state.username;
    }


    handleSubmit = (event) => {
        event.preventDefault()

        fetch("https://before-you-go.herokuapp.com/login", {
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
                this.props.setUser(userInfo);
                this.props.history.push('/homepage');
            } else {
                this.setState({ error: true })
            }
          })
    }

    render(){
        return (
            <div className='hello'>
                <form onSubmit={this.handleSubmit} className="signup">
                        <label>Log In</label><br/>
                        <input type="text" placeholder="username" name="username" onChange={this.handleChange}></input><br/>
                        <input type="password" placeholder="password" name="password" onChange={this.handleChange}></input><br/>
                        <button className="buttonPage">Submit</button>
                </form>
                { this.state.error ? <p>Wrong username or password. Try again.</p> : <p></p>}
            </div>
        )
    }
}

export default LoginForm;