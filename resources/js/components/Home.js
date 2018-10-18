import React, { Component } from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { view } from 'react-easy-state';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true,
    }

    autoBind(this);
  }

  componentDidMount() {
    axios.get('/api/users?all=1')
    .then(res => {
      this.setState({
        users: res.data,
        loading: false,
      })
    })
    .catch(err => {
      console.error('Error fetching users', err);
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          <div>Investors</div>
          <div>
            {
              this.state.users.map(user => {
                return (
                  <div key={user.id} style={{ marginBottom: '12px' }}>
                    <div>
                      <a href={user.u_name}>{ user.u_name }</a>
                    </div>
                    <div>
                      <a href={ 'mailto:' + user.email }><button>Send Email</button></a>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}

export default view(Home);
