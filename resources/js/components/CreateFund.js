import React, { Component } from 'react'
import autoBind from 'react-autobind'

class CreateFund extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fund: {},
    }

    autoBind(this)
  }

  render() {
    return (
      <div>
        <div>
          <label>Name: </label><br></br>
          <input type='text'></input>
        </div>

        <div>
          <label>Prospectus: </label><br></br>
          <textarea></textarea>
        </div>

        <div>
          <label>Holdings: </label><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
          <input type='text'></input><br></br>
        </div>

        <div>
          <button>Create Fund</button>
        </div>
      </div>
    )
  }
}

export default CreateFund;
