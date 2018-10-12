import React, { Component } from 'react';
import autoBind from 'react-autobind';
import auth from '../services/auth';
import history from '../services/history';

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      f_name: '',
      l_name: '',
      u_name: '',
    };

    autoBind(this);
  }

  signup() {
    if (!this.state.email || !this.state.password) {
      alert('Please fill in both email and password fields.');
    }

    auth.signup(this.state).then(liu => history.replace('/'))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Username: 
            <input type='text' name='u_name' value={ this.state.u_name } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <label>
            Email: 
            <input type='text' name='email' value={ this.state.email } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <label>
            First Name: 
            <input type='text' name='f_name' value={ this.state.f_name } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <label>
            Last Name: 
            <input type='text' name='l_name' value={ this.state.l_name } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <label>
            Password: 
            <input type='password' name='password' value={ this.state.password } onChange={ this.handleChange }></input>
          </label>
        </div>
        <div>
          <button onClick={ this.signup }>Sign Up</button> 
        </div>
      </div>
    )
  }
}

export default Signup;
