import React, { Component } from 'react'
import autoBind from 'react-autobind'
import axios from 'axios';
import rootStore from '../services/rootStore';
import history from '../services/history';
import { view } from 'react-easy-state';
class CreateFund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      prospectus: '',
      tickers: [],
      user_id: rootStore.liu.id,
    }

    autoBind(this)
  }

  componentDidMount() {
    if (!rootStore.liu.id) {
      history.replace('/');
    }
  }

  createFund() {
    axios.post('/api/funds', this.state)
    .then(res => {
      history.replace('/');
    })
    .catch(err => console.log('Error creating fund', err));
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
          <input type='text' name="name" value={ this.state.name } onChange={ (e) => this.handleChange(e) }></input>
        </div>

        <div>
          <label>Prospectus: </label><br></br>
          <textarea name="prospectus" value={ this.state.prospectus } onChange={ (e) => this.handleChange(e) }></textarea>
        </div>

        <div>
          <label>Holdings: </label> <button onClick={ () => this.addHolding() }>Add Holding</button><br></br>
          {
            this.state.tickers.map((value, index) => {
              return (
                <div key={ index }>
                  <input type='text' name={ index } value={ this.state.tickers[index] || '' } onChange={ (e) => this.handleTickerChange(e) }></input><br></br>
                </div>
              )
            })
          }
        </div>

        <div>
          <button onClick={ () => this.createFund() }>Create Fund</button>
        </div>
      </div>
    )
  }
}

export default view(CreateFund);
