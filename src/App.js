import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import DestinationDisplay from './containers/DestinationDisplay';
import DestinationBook from './components/DestinationBook';


class App extends React.Component {

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route 
            exact
            path="/"
            render={(routerProps) => < Homepage {...routerProps} />}
          />
          <Route 
            exact
            path="/myTrips"
            render={(routerProps) => <DestinationDisplay {...routerProps} />}
          />
          <Route 
            exact
            path="/myDestination/"
            render={(routerProps) => <DestinationBook {...routerProps} />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
