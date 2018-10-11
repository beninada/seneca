import React, { Component } from 'react'
import autoBind from 'react-autobind'

class CreateFund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      prospectus: '',
      tickers: [],
    }

    autoBind(this)
  }

  createFund() {
    fetch('/api/funds', {
      method: 'POST',
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  addHolding() {
    let tickers = this.state.tickers.concat('');
    this.setState({ tickers: tickers })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTickerChange(e) {
    let tickers = this.state.tickers;
    tickers[e.target.name] = e.target.value
    this.setState({ tickers: tickers });
  }

  render() {
    return (
      <div>
        <div>
          <label>Name: </label><br></br>
          <input type='text' name="name" value={ this.state.name } onChange={ this.handleChange }></input>
        </div>

        <div>
          <label>Prospectus: </label><br></br>
          <textarea name="prospectus" value={ this.state.prospectus } onChange={ this.handleChange }></textarea>
        </div>

        <div>
          <label>Holdings: </label> <button onClick={ this.addHolding }>Add Holding</button><br></br>
          {
            this.state.tickers.map((value, index) => {
              return (
                <div key={ index }>
                  <input type='text' name={ index } value={ this.state.tickers[index] || '' } onChange={ this.handleTickerChange }></input><br></br>
                </div>
              )
            })
          }
        </div>

        <div>
          <button onClick={ this.createFund }>Create Fund</button>
        </div>
      </div>
    )
  }
}

export default CreateFund;
