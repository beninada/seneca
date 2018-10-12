
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

import auth from './services/auth';
import history from './services/history';
import rootStore from './services/rootStore';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.check();
  }

  render() {
    return (
      <Router history={ history }>
        <div>
          <Nav />
          <Switch>
            {/* <Route exact path='/' component={Landing} />
            <Route path='/signup' component={Signup} /> */}
            <Route exact path='/' component={ Home } />
            <Route path='/signup' component={ Signup } />
            <Route exact path='/funds/create-fund' component={ CreateFund } />
            <Route path='/fund/:id' component={ Fund } />
            <Route path='/:u_name' component={ UserProfile } />
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
