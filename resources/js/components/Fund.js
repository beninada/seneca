import React, { Component } from 'react'
import autoBind from 'react-autobind'

class Fund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fund: {},
      loading: true,
    }

    autoBind(this)
  }

  componentDidMount() {
    fetch('/api/funds?id=' + this.props.match.params.id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        fund: data,
        loading: false,
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      let fund = this.state.fund

      return (
        <div>
          <div>
            Name: { fund.name }
          </div>
          <div style={{ marginBottom: '12px' }}>
            Prospectus: { fund.prospectus }
          </div>
        </div>
      )
    }
  }
}

export default Fund;
