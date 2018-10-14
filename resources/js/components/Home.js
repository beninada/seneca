import React, { Component } from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import rootStore from '../services/rootStore';
import history from '../services/history';
import { view } from 'react-easy-state';

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
    axios.get('/api/users?all=1')
    .then(res => {
      this.setState({
        users: res.data,
        investors: res.data.filter(user => user.role === 'investor'),
        managers: res.data.filter(user => user.role === 'manager'),
        loading: false,
      })
    })
    .catch(err => {
      console.error('Error fetching users', err);
    })

    axios.get('/api/funds?all=1')
    .then(res => {
      this.setState({
        ...this.state,
        funds: res.data,
        loading: false,
      })
    })
    .catch(err => {
      console.error('Error fetching funds', err);
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          <div style={{ marginBottom: '12px' }}>Fund Managers</div>
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
          <div style={{ paddingTop: '12px', marginBottom: '12px' }}>
            Funds { rootStore.liu.id ? <a onClick={ () => history.replace('/funds/create-fund') }><button>Create Fund</button></a> : '' }
          </div>
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

export default view(Home);
