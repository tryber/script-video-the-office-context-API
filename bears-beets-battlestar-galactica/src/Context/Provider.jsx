import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './TheOfficeContext';
import FetchAPI from '../Services/FetchAPI';

function TheOfficeProvider({ children }) {
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [epCopy, setEpCopy] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const zero = 0;

  const applyFilters = (filterBy, number) => {
    if (Number(number) > zero) {
      const newArray = [...allEpisodes];
      switch (filterBy) {
      case ('episode'):
        setEpCopy(newArray.filter((ep) => Number(ep.number) === Number(number)));
        break;
      case ('season'):
        setEpCopy(newArray.filter((ep) => Number(ep.season) === Number(number)));
        break;
      default:
        return newArray;
      }
    }
  };

  useEffect(() => {
    const getEpisodes = async () => {
      const { _embedded: { episodes } } = await FetchAPI();
      setAllEpisodes(episodes);
      setEpCopy(episodes);
    };
    getEpisodes();
  }, []);

  const toggleFavorites = (item) => (favorites
    .length !== zero && favorites.some((episode) => episode.id === item.id)
    ? setFavorites(favorites.filter((ep) => ep.id !== item.id))
    : setFavorites([...favorites, item]));

  const contextValue = {
    epCopy,
    favorites,
    toggleFavorites,
    applyFilters,
  };

  return (
    <main>
      <Context.Provider value={ contextValue }>
        {children}
      </Context.Provider>
    </main>
  );
}

TheOfficeProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TheOfficeProvider;
