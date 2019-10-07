import React from 'react';

class RegisterForm extends React.Component {
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

        fetch("http://localhost:3000/signup", {
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
              this.props.history.push('/homepage')
            }
          })
    }

    render(){
        //console.log(this.state.username)
        return (

            <div>
                <form onSubmit={this.handleSubmit} className="signup">
                    <label>Sign up</label><br/>
                    <input type="text" placeholder="username" name="username" onChange={this.handleChange}></input><br/>
                    <input type="text" placeholder="password" name="password" onChange={this.handleChange}></input><br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default RegisterForm;