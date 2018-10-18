import React, { Component } from 'react';
import autoBind from 'react-autobind';
import auth from '../services/auth';
import history from '../services/history';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    };

    autoBind(this);
  }

  login() {
    if (!this.state.email || !this.state.password) {
      alert('Please fill in both email and password fields.');
    }

    auth.login(this.state).then(res => history.replace('/'));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Email: 
            <input type='text' name='email' value={ this.state.email } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <label>
            Password: 
            <input type='password' name='password' value={ this.state.password } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <button onClick={ this.login }>Log in</button> 
        </div>
        <a href="mailto:me@beninada.com?subject=I%20forgot%20my%20password">I forgot my password</a>
      </div>
    )
  }
}

export default Login;
