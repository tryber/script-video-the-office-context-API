import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import footer from '../images/DunderMifflin.png';
import FavoritesCards from '../Components/FavoritesCards';

export default function Favorites({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <FavoritesCards />
      <div className="footer">
        <img src={ footer } alt="the office logo" width="250px" />
      </div>
    </div>
  );
}

Favorites.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
