import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { view } from 'react-easy-state';
import rootStore from '../services/rootStore';
import auth from '../services/auth';
import history from '../services/history';

class Nav extends Component {
  constructor(props) {
    super(props)
    autoBind(this);
  }

  logout() {
    auth.logout().then(res => history.replace('/'));
  }

  goToSignup() {
    history.push('/signup');
  }

  goToLogin() {
    history.push('/login');
  }

  render() {
    return (
      <nav style={{ height: '48px', padding: '10px 0' }}>
        <span style={{ float: 'left' }}>Seneca</span>
        <span style={{ float: 'right' }}>
          { !rootStore.liu.id && (
              <span>
                <button onClick={ this.goToLogin }>Log In</button> 
                <button onClick={ this.goToSignup }>Sign Up</button>
              </span>
            )
          }
          { rootStore.liu.id && <button onClick={ this.logout }>Log Out</button> }
        </span>
      </nav>
    );
  }
}

export default view(Nav);
