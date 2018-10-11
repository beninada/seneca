import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Auth from '../services/Auth';

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    };

    autoBind(this);
  }

  componentDidMount() {
    const auth = new Auth();
    auth.login();
  }

  render() {
    return (
      <div>
        <label>
          Email: 
          <input type='text' name='email' value={ this.state.email }></input>
        </label>
        <label>
          Password: 
          <input type='password' name='password' value={ this.state.password }></input>
        </label>
      </div>
    )
  }
}

export default Signup;
