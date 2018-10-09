import React, { Component } from 'react';
import autoBind from 'react-autobind';

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      loading: true,
    }

    autoBind(this);
  }

  componentDidMount() {
    fetch('/api/users?u_name=' + this.props.match.params.u_name, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data,
        loading: false,
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          <div style={{marginBottom: '12px'}}>
            { this.state.user.u_name }
          </div>
          <div>
            Name: { this.state.user.f_name } { this.state.user.l_name }
          </div>
          <div>
            Location: { this.state.user.profile.city }, { this.state.user.profile.country }
          </div>
          <div style={{marginBottom: '12px'}}>
            Bio: { this.state.user.profile.bio }
          </div>
          <div>
            <a href={'mailto:' + this.state.user.email}><button>Send Email</button></a>
          </div>
        </div>
      )
    }
  }
}

export default UserProfile;
