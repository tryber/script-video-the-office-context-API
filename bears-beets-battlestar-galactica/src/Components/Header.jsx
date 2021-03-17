import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/theOffice.png';
export default function Header({ history }) {
  const { location: { pathname } } = history;
  const path = pathname;

  const goToFav = () => {
    history.push('/fav');
  };

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div>
      <div className="header d-flex flex-row align-items-center justify-content-around">
        <img src={ logo } alt="the office logo" width="350px" />
        <h1>{ path === '/' ? 'Todos os Episódios' : 'Lista de Favoritos'}</h1>
        <button
          type="button"
          className="show-fav-btn btn"
          onClick={ path === '/' ? goToFav : goToHome }
        >
          {path === '/' ? 'Favoritos' : 'Todos os Episódios' }
        </button>
      </div>
      <hr />
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};
