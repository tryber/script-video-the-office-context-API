import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import EpisodesCards from '../Components/EpisodesCards';
import Filters from '../Components/Filters';
import footer from '../images/DunderMifflin.png';

export default function Episodes({ history }) {
  return (
    <div className="App">
      <Header history={ history } />
      <Filters />
      <EpisodesCards />
      <div className="footer">
        <img className="footer" src={ footer } alt="the office logo" width="250px" />
      </div>
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
