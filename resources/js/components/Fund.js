import React, { Component } from 'react'
import autoBind from 'react-autobind'
import axios from 'axios';
import rootStore from '../services/rootStore';
import history from '../services/history';
class Fund extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fund: {
        holdings: []
      },
      editedFund: {
        holdings: []
      },
      editedTickers: [],
      loading: true,
      isEditing: false,
      isManager: false,
    }

    autoBind(this)
  }

  componentDidMount() {
    axios.get('/api/funds?id=' + this.props.match.params.id)
    .then(res => {
      this.setState({
        fund: res.data,
        editedFund: res.data,
        loading: false,
      });

      // check if any of the managers is the liu
      if (rootStore.liu.id) {
        res.data.managers.map(manager => {
          if (manager.id === rootStore.liu.id) {
            this.setState({ isManager: true });
            return;
          }
        });
      }
    })
    .catch(err => console.log('Error fetching fund', err));
  }

  handleFundChange(e) {
    this.setState({
      editedFund: {
        ...this.state.editedFund,
        [e.target.name]: e.target.value
      }
    });
  }

  handleTickerChange(e) {
    let tickers = this.state.editedTickers;
    tickers[e.target.name] = e.target.value

    this.setState({
      editedTickers: tickers
    });
  }

  submit() {
    var that = this;

    axios.put(`/api/funds/${this.state.fund.id}`, {
      name: this.state.editedFund.name,
      prospectus: this.state.editedFund.prospectus,
      tickers: this.state.editedTickers,
      user_id: rootStore.liu.id,
    })
    .then(res => {
      that.setState({
        fund: res.data,
        editedFund: res.data,
        isEditing: false,
        loading: false,
      });
    })
    .catch(err => {
      console.error('Error saving fund.', err);
      // alert('There was an error saving your fund. Please try again.');
    });
  }

  cancel() {
    history.replace(`/fund/${this.state.fund.id}`);
    this.setState({
      editedFund: this.state.fund,
      isEditing: false,
    });
  }

  addHolding() {
    let tickers = this.state.editedTickers.concat('');
    this.setState({ editedTickers: tickers })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    } else {
      if (!this.state.isEditing) {
        return (
          <div>
            { this.state.isManager ? <button onClick={ () => this.setState({ isEditing: true }) }>Edit</button> : '' }
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
                    return <span key={ manager.id }><a href={ '/' + manager.u_name }>{ manager.u_name }</a> </span>
                  })}
                </div> : ''
            }
          </div>
        )
      } else {
        return (
          <div>
            <div>
              <label>
                Fund Name
                <input type='text' name='name' value={ this.state.editedFund.name || '' } onChange={ (e) => this.handleFundChange(e) }></input>
              </label>
            </div>
            <div>
              <label>
                Prospectus
                <input type='text' name='prospectus' value={ this.state.editedFund.prospectus || '' } onChange={ (e) => this.handleFundChange(e) }></input>
              </label>
            </div>
            <label>Holdings: </label> <button onClick={ this.addHolding }>Add Holding</button><br></br>
            {
              this.state.editedTickers.map((value, index) => {
                return (
                  <div key={ index }>
                    <input type='text' name={ index } value={ this.state.editedTickers[index] || '' } onChange={ (e) => this.handleTickerChange(e) }></input><br></br>
                  </div>
                )
              })
            }
            <button onClick={ () => this.submit() }>Submit</button>
            <button onClick={ () => this.cancel() }>Cancel</button>
         </div>
        )
      }
    }
  }
}

export default Fund;
