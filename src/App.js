import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Homepage from './Homepage';
import Trips from './containers/Trips';
import Destination from './components/Destination';


class App extends React.Component {

  state = {
    username: 'login',
    id: null
  }

  redirect = (page) => {
    this.setState({ page: page })
  }

  componentDidMount(){
    if (localStorage.token) {    
        fetch('http://localhost:3000/homepage', {
            headers: {
                Authorization: localStorage.token
            }
        })
        .then(res => res.json())
        .then(profileData => {
           this.setState({ username: profileData.username, id: profileData.id })
        })
    }
  }

  render() {

    return(
      <Switch>

        <Route
          exact 
          path='/' 
          render ={(routerProps)=> <Homepage {...routerProps } username={this.state.username} id={this.state.id}/>} 
          />
          <Route 
          exact 
          path='/myTrips' 
          render ={(routerProps)=> <Trips {...routerProps } username={this.state.username} id={this.state.id}/>} 
          />
          <Route exact 
          path='/destinations' 
          render ={(routerProps)=> <Destination {...routerProps } username={this.state.username} id={this.state.id}/>} 
          />
        <Route path='/login' component={ LoginForm } />
        <Route path='/signup' component={ RegisterForm }/>



      </Switch>
    )
/*       switch(this.state.page){
        case 'login':
          return <LoginForm redirect={ this.redirect } />
        case 'signup':
          return <RegisterForm redirect={ this.redirect } />
        case 'homepage':

        //pass props history to Homepage
          return <Homepage />
        default:
            return <LoginForm />
      } */    
  }
}


export default App;
