import React, { Component } from 'react';
import {parse} from 'query-string';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Profile = ({info}) => (
  <PlayerPreview player={{name: info.login, img: info.avatar_url}}>
    <ul className="space-list-items">
      {info.name && <li>{info.name}</li>}
      {info.location && <li>{info.location}</li>}
      {info.company && <li>{info.company}</li>}
      <li>Followers: {info.followers}</li>
      <li>Following: {info.following}</li>
      <li>Public Repos: {info.public_repos}</li>
      {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
    </ul>
  </PlayerPreview>
);

Profile.propTypes = {
  info: PropTypes.object.isRequired
};


const Player = ({label, score, profile}) => (
  <div>
    <h1 className="header">{label}</h1>
    <h3 style={{textAlign: 'center'}}>{score}</h3>
    <Profile info={profile}/>
  </div>
);

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    const {playerOneName, playerTwoName} = parse(this.props.location.search);
    api.battle([playerOneName, playerTwoName]).then(results => {
      if (results === null) {
        return this.setState({
          error: 'Looks like there was error. Check that both users exist on Github',
          loading: false
        })
      }
      this.setState({
        winner: results[0],
        loser: results[1],
        error: null,
        loading: false
      })
    });
  }

  render() {
    const {error, winner, loser, loading} = this.state;
    if (loading) {
      return <Loading/>
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'/>
        </div>
      )
    }
    return (
      <div className="row">
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    )
  }
}

export default Results;
