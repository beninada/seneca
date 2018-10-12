import React, { Component } from 'react'
import autoBind from 'react-autobind'
import axios from 'axios';

class Fund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fund: {
        holdings: []
      },
      loading: true,
    }

    autoBind(this)
  }

  componentDidMount() {
    axios.get('/api/funds?id=' + this.props.match.params.id)
    .then(res => {
      this.setState({
        fund: res.data,
        loading: false,
      })
    })
    .catch(err => console.log('Error fetching fund', err));
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          <div>
            Name: { this.state.fund.name }
          </div>
          <div>
            Prospectus: { this.state.fund.prospectus }
          </div>
          {
            this.state.fund.holdings.length ? 
              <div>
                Holdings: { this.state.fund.holdings.map(holding => holding.ticker.symbol + ' ') }
              </div> : ''
          }
          {
            this.state.fund.users.length ? 
              <div>
                Managers: { this.state.fund.managers.map(manager => {
                  return <span key={manager.id}><a href={'/' + manager.u_name}>{manager.u_name}</a> </span>
                })}
              </div> : ''
          }
        </div>
      )
    }
  }
}

export default Fund;
