import React, { Component } from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { view } from 'react-easy-state';
import rootStore from '../services/rootStore';
import history from '../services/history';
class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      editedUser: {},
      loading: true,
      isLiu: false,
      isEditing: false,
    }

    autoBind(this);
  }

  componentDidMount() {
    axios.get('/api/users?u_name=' + this.props.match.params.u_name)
    .then(res => {
      this.setState({
        user: res.data,
        editedUser: res.data,
        isLiu: rootStore.liu.id === res.data.id,
        loading: false
      })
    })
    .catch(err => console.log('Error fetching user', err));
  }

  handleUserChange(e) {
    this.setState({
      editedUser: {
        ...this.state.editedUser,
        [e.target.name]: e.target.value
      }
    });
  }

  handleUserProfileChange(e) {
    this.setState({
      editedUser: {
        ...this.state.editedUser,
        profile: {
          ...this.state.editedUser.profile,
          [e.target.name]: e.target.value
        }
      }
    });
  }

  submit() {
    var that = this;

    axios.put(`/api/users/${rootStore.liu.id}`, {
      u_name: this.state.editedUser.u_name,
      f_name: this.state.editedUser.f_name,
      l_name: this.state.editedUser.l_name,
      city: this.state.editedUser.profile.city,
      country: this.state.editedUser.profile.country,
      bio: this.state.editedUser.profile.bio,
    })
    .then(res => {
      that.setState({
        user: res.data,
        editedUser: res.data,
        isEditing: false,
      });
    })
    .catch(err => {
      console.error('Error saving profile.', err);
      // alert('There was an error saving your profile. Please try again.');
    });
  }

  cancel() {
    history.replace(`/${this.state.user.u_name}`);
    this.setState({
      editedUser: this.state.user,
      isEditing: false,
    });
  }

  edit() {
    this.setState({ isEditing: true });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      if (!this.state.isEditing) {
        return (
          <div>
            { this.state.user.id == rootStore.liu.id ? <button onClick={ () => this.edit() }>Edit</button> : '' }
            <div style={{ marginBottom: '12px' }}>
              { this.state.user.u_name }
            </div>
            <div>
              Name: { this.state.user.f_name } { this.state.user.l_name }
            </div>
            <div>
              Location: { this.state.user.profile.city }, { this.state.user.profile.country }
            </div>
            <div style={{ marginBottom: this.state.user.funds.length ? '0' : '12px' }}>
              Bio: { this.state.user.profile.bio }
            </div> 
            {
              this.state.user.funds.length ?
                <div style={{marginBottom: '12px'}}>
                  Funds: { this.state.user.funds.map(fund => {
                    return <span key={fund.id}><a href={'/fund/' + fund.id}>{fund.name} ({fund.role})</a> </span>
                  })}
                </div> : ''
            }
            <div>
              <a href={ 'mailto:' + this.state.user.email }><button>Send Email</button></a>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div>
              <div style={{ marginBottom: '12px' }}>
                <label>
                  Username:
                  <input type='text' name='u_name' value={ this.state.editedUser.u_name || ''} onChange={ (e) => this.handleUserChange(e) }></input>
                </label>
              </div>
              <div>
                <label>
                  First name:
                  <input type='text' name='f_name' value={ this.state.editedUser.f_name || ''} onChange={ (e) => this.handleUserChange(e) }></input>
                </label>
              </div>
              <div>
                <label>
                  Last name:
                  <input type='text' name='l_name' value={ this.state.editedUser.l_name || ''} onChange={ (e) => this.handleUserChange(e) }></input>
                </label>
              </div>
              <div>
                <label>
                  City:
                  <input type='text' name='city' value={ this.state.editedUser.profile.city || ''} onChange={ (e) => this.handleUserProfileChange(e) }></input>
                </label>
              </div>
              <div>
                <label>
                  Country:
                  <input type='text' name='country' value={ this.state.editedUser.profile.country || ''} onChange={ (e) => this.handleUserProfileChange(e) }></input>
                </label>
              </div>
              <div>
                <label>
                  Bio:
                  <input type='text' name='bio' value={ this.state.editedUser.profile.bio || ''} onChange={ (e) => this.handleUserProfileChange(e) }></input>
                </label>
              </div>
            </div>
            <button onClick={ () => this.submit() }>Submit</button>
            <button onClick={ () => this.cancel() }>Cancel</button>
          </div>
        )
      }
    }
  }
}

export default view(UserProfile);
