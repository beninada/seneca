
require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';

import auth from './services/auth';
import history from './services/history';

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
            <Route path='/login' component={ Login } />
            {/* <Route exact path='/funds/create-fund' component={ CreateFund } /> */}
            {/* <Route path='/fund/:id' component={ Fund } /> */}
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
