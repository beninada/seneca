import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Nav extends Component {
  constructor(props) {
    super(props)
    autoBind(this);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav style={{ height: '48px', padding: '10px 0' }}>
        <span style={{ float: 'left' }}>Seneca</span>
        <span style={{ float: 'right' }}>
          { !isAuthenticated() && <button onClick={this.login.bind(this)}>Log In</button> }
          { isAuthenticated() && <button onClick={this.logout.bind(this)}>Log Out</button> }
        </span>
      </nav>
    );
  }
}

export default Nav;
