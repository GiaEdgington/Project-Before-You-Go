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
    username: '',
    id: null
  }

 
  componentDidMount(){
    if (localStorage.token){
      fetch('https://before-you-go.herokuapp.com/homepage', {
        headers: {
          Authorization: localStorage.token
        }
      })
      .then(response => response.json())
      .then((profileData) => {
        this.setState({ username: profileData.username, id: profileData.id });
      })
    }
  }

  setUser = (profileData) => {
    this.setState({ username: profileData.username, id: profileData.id });
    localStorage.id = profileData.id;
  }

  render() {
    return(
      <Switch>
        <Route
          exact 
          path='/' 
          render={(routerProps)=> <Intro {...routerProps } />} 
        />

        <Route
          path='/homepage' 
          render={(routerProps)=> <Homepage {...routerProps } username={this.state.username} id={this.state.id}/>} 
        />
        <Route 
          exact 
          path='/myTrips' 
          render={(routerProps)=> <Trips {...routerProps } username={this.state.username} id={this.state.id} />} 
        />
        <Route 
          exact 
          path='/destinations' 
          render={(routerProps)=> <Destination {...routerProps } username={this.state.username} id={this.state.id}/>} 
        />
        <Route
          path='/login'
          render={(routerProps)=> <LoginForm {...routerProps } setUser={ this.setUser}/> }
        />
        <Route path='/signup' component={ RegisterForm }/>

      </Switch>
    )   
  }
}


export default App;
