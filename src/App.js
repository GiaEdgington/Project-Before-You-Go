import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Homepage from './Homepage';
import Trips from './containers/Trips';
import Destination from './components/Destination';
import Intro from './Intro';


class App extends React.Component {

  state = {
    username: 'login',
    id: null
  }

  updateUserInfo = (username, id) => {
    this.setState({ username: username, id: id })
  }

  setUser = async () => {
    //if (localStorage.token) {    
      let response = await fetch('http://localhost:3000/homepage', {
          headers: {
              Authorization: localStorage.token
          }
      })
      let data = await response.json()
      return data
    //}
  }

  componentDidMount(){
    this.setUser().then(profileData => {
      this.setState({ username: profileData.username, id: profileData.id })
    })
  }

  render() {

    return(
      <Switch>
        <Route
          exact 
          path='/' 
          render ={(routerProps)=> <Intro {...routerProps } username={this.state.username} id={this.state.id}/>} 
        />

        <Route
          path='/homepage' 
          render ={(routerProps)=> <Homepage {...routerProps } username={this.state.username} id={this.state.id}/>} 
        />
        <Route 
          exact 
          path='/myTrips' 
          render ={(routerProps)=> <Trips {...routerProps } username={this.state.username} id={this.state.id} setUser={ this.setUser }/>} 
        />
        <Route 
          exact 
          path='/destinations' 
          render ={(routerProps)=> <Destination {...routerProps } username={this.state.username} id={this.state.id}/>} 
        />
        <Route
          path='/login'
          render ={(routerProps)=> <LoginForm {...routerProps } updateUserInfo={ this.updateUserInfo }/> }
        />
        <Route path='/signup' component={ RegisterForm }/>

      </Switch>
    )   
  }
}


export default App;
