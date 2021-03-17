import React, { useState, useContext } from 'react';
import TheOfficeContext from '../Context/TheOfficeContext';

export default function Filters() {
  const { applyFilters } = useContext(TheOfficeContext);
  const [filterBy, setFilterBy] = useState('season');
  const zero = 0;
  const [number, setNumber] = useState(zero);

  return (
    <div>
      <label htmlFor="season">
        Temporada
        <input
          type="radio"
          name="filter"
          value="season"
          checked={ filterBy === 'season' }
          onChange={
            ({ target: { value } }) => setFilterBy(value)
          }
        />
      </label>
      <label htmlFor="episode">
        Episódio
        <input
          type="radio"
          name="filter"
          value="episode"
          checked={ filterBy === 'episode' }
          onChange={
            ({ target: { value } }) => setFilterBy(value)
          }
        />
      </label>
      <input
        className="input-number"
        type="number"
        placeholder="Número"
        min="1"
        onChange={
          ({ target: { value } }) => setNumber(value)
        }
      />
      <button
        className="btn"
        type="button"
        onClick={ () => applyFilters(filterBy, number) }
      >
        Filtrar
      </button>
    </div>
  );
}
