import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const username = event.target.value;
    this.setState({username});
  }
  handleSubmit(event) {
    event.preventDefault();
    const {onSubmit, id} = this.props;
    onSubmit(id, this.state.username);
  }
  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: {name: '', img: null},
      playerTwo: {name: '', img: null}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    const newState = {};
    newState[id] = {
      name: username,
      img: username ? `https://github.com/${username}.png?size=200` : null
    };
    this.setState(newState);
  }
  handleReset(id) {
    this.handleSubmit(id, '');
  }
  render() {
    const { playerOne, playerTwo } = this.state;
    const { match } = this.props;
    return (
      <div>
        <div className="row">

          {!playerOne.name && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />}

          {playerOne.img && <PlayerPreview player={playerOne}>
            <button
              className="reset"
              onClick={this.handleReset.bind(null, 'playerOne')}
            >Reset</button>
          </PlayerPreview>}

          {!playerTwo.name && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />}

          {playerTwo.img && <PlayerPreview player={playerTwo}>
            <button
              className="reset"
              onClick={this.handleReset.bind(null, 'playerTwo')}
            >Reset</button>
          </PlayerPreview>}

        </div>
        {playerOne.name && playerTwo.name &&
        <Link className="button" to={{
          pathname: `${match.url}/results`,
          search: `?playerOneName=${playerOne.name}&playerTwoName=${playerTwo.name}`
        }}>Battle</Link>
        }
      </div>
    )
  }
}

export default Battle;
