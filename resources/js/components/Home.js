import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      investors: [],
      managers: [],
      funds: [],
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

    fetch('/api/funds?all=1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        ...this.state,
        funds: data,
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
          <div>Fund Managers</div>
          <div>
            {
              this.state.managers.map(user => {
                return (
                  <div key={user.id} style={{marginBottom: '12px'}}>
                    <div>
                      <a href={user.u_name}>{user.u_name}</a>
                    </div>
                    <div>
                      <a href={'mailto:' + user.email}><button>Send Email</button></a>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* <div>Investors</div>
          <div>
            {
              this.state.investors.map(user => {
                return (
                  <div key={user.id} style={{marginBottom: '12px'}}>
                    <div>
                      <a href={user.u_name}>{user.u_name}</a>
                    </div>
                    <div>
                      <a href={'mailto:' + user.email}><button>Send Email</button></a>
                    </div>
                  </div>
                )
              })
            }
          </div> */}
          <div>Funds</div>
          <a href='/funds/create-fund'><button>Create Fund</button></a>
          <div>
            {
              this.state.funds.map(fund => {
                return (
                  <div key={fund.id}>
                    <div>
                      <a href={'fund/' + fund.id}>{fund.name}</a>
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
