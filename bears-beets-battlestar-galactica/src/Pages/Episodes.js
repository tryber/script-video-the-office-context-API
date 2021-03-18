import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import EpisodesCards from '../Components/EpisodesCards';
import Filters from '../Components/Filters';
import footerImage from '../images/DunderMifflin.png';

export default function Episodes({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <Filters />
      <EpisodesCards />
      <footer className="footer">
        <img className="footer" src={ footerImage } alt="the office logo" width="250px" />
      </footer>
    </div>
  );
}

Episodes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
