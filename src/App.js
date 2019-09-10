import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Homepage from './Homepage';
import Trips from './containers/Trips';
import DestinationBook from './components/DestinationBook';


class App extends React.Component {

  state = {
    page: 'signup'
  }

  redirect = (page) => {
    this.setState({ page: page })
  }

  componentDidMount(){
    if (localStorage.token) {
      this.redirect('homepage')
    }
  }

  render() {
      switch(this.state.page){
        case 'login':
          return <LoginForm redirect={ this.redirect } />
        case 'signup':
          return <RegisterForm redirect={ this.redirect } />
        case 'homepage':
          return <Homepage />
        default:
            return <LoginForm />
      }    
  }
}


export default App;
