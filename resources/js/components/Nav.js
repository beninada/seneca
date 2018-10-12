import React, { Component } from 'react';
import autoBind from 'react-autobind';
import rootStore from '../services/rootStore';
import auth from '../services/auth';

class Nav extends Component {
  constructor(props) {
    super(props)
    autoBind(this);
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    return (
      <nav style={{ height: '48px', padding: '10px 0' }}>
        <span style={{ float: 'left' }}>Seneca</span>
        <span style={{ float: 'right' }}>
          { !rootStore.liu.id && <button onClick={ this.login.bind(this) }>Log In</button> }
          { rootStore.liu.id && <button onClick={ this.logout.bind(this) }>Log Out</button> }
        </span>
      </nav>
    );
  }
}

export default Nav;
