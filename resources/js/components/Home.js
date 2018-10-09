import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      investors: [],
      managers: [],
      loading: true,
    }

    autoBind(this);
  }

  componentDidMount() {
    fetch('/api/users?all=1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        users: data,
        investors: data.filter(user => user.role === 'investor'),
        managers: data.filter(user => user.role === 'manager'),
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
          <h2>Fund Managers</h2>
          <div>
            {
              this.state.managers.map(user => {
                return (
                  <div key={user.id} style={{marginBottom: '12px'}}>
                    <div>
                      {user.u_name}
                    </div>
                    <div>
                      <a href={'mailto:' + user.email}><button>Send Email</button></a>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <h2>Investors</h2>
          <div>
            {
              this.state.investors.map(user => {
                return (
                  <div key={user.id} style={{marginBottom: '12px'}}>
                    <div>
                      {user.u_name}
                    </div>
                    <div>
                      <a href={'mailto:' + user.email}><button>Send Email</button></a>
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

export default Home;
