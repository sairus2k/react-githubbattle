import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = ({player, children}) => (
  <div>
    <div className="column">
      <img src={player.img} alt={`Avatar for ${player.name}`} className="avatar"/>
      <h2 className="username">@{player.name}</h2>
    </div>
    {children}
  </div>
);

PlayerPreview.propTyeps = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  })
};

export default PlayerPreview;
