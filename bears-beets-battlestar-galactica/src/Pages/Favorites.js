import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import footerImage from '../images/DunderMifflin.png';
import FavoritesCards from '../Components/FavoritesCards';

export default function Favorites({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <FavoritesCards />
      <footer className="footer">
        <img src={ footerImage } alt="the office logo" width="250px" />
      </footer>
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
