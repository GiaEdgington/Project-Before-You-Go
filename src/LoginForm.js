import React from 'react';

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
                console.log(userInfo)
                localStorage.token = userInfo.token
                this.props.updateUserInfo(userInfo.username, userInfo.id)
                this.props.history.push('/homepage')
            }
            else {
                this.props.history.push('/signup')
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
                        <button className="buttonPage">  Submit</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;