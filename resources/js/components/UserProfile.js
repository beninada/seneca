import React, { Component } from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';

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
    axios.get('/api/users?u_name=' + this.props.match.params.u_name)
    .then(res => {
      this.setState({
        user: res.data,
        loading: false,
      })
    })
    .catch(err => console.log('Error fetching user', err));
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
    }
  }
}

export default UserProfile;
