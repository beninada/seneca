
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Fund from './components/Fund';
import CreateFund from './components/CreateFund';
import Signup from './components/Signup';
import Nav from './components/Nav';
import Auth0Callback from './components/Auth0Callback';

import Auth from './services/Auth';
import history from './services/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    return (
      <Router history={ history }>
        <div>
          <Nav auth={ auth } />
          <Switch>
            <Route exact path='/' render={props => <Home auth={ auth } {...props} />} />
            <Route path='/signup' render={props => <Signup auth={ auth } {...props} />} />
            <Route path="/auth0-callback" render={props => {
              handleAuthentication(props);
              return <Auth0Callback {...props} /> 
            }}/>
            <Route exact path='/funds/create-fund' render={props => <CreateFund auth={ auth } {...props} />} />
            <Route path='/fund/:id' render={props => <Fund auth={ auth } {...props} />} />
            <Route path='/:u_name' render={props => <UserProfile auth={ auth } {...props} />} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
