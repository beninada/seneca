
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Fund from './components/Fund';
import CreateFund from './components/CreateFund';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* { this.error ? <Redirect from='/' to='login' /> : '' } */}
        <Switch>
          {/* <Route exact path='/' component={Landing} />
          <Route path='/signup' component={Signup} /> */}
          <Route exact path='/' component={ Home } />
          <Route exact path='/:u_name' component={ UserProfile } />
          <Route path='/fund/:id' component={ Fund } />
          <Route path='/funds/create-fund' component={ CreateFund } />
          <Route render={function () {
            return <p>Not Found</p>
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
