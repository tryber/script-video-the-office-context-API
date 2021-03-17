import React, { useContext } from 'react';
import TheOfficeContext from '../Context/TheOfficeContext';

export default function EpisodesCards() {
  const { epCopy, favorites, toggleFavorites } = useContext(TheOfficeContext);

  return (
    <div>
      <section className="body">
        {
          epCopy
            .map((episode) => (
              <div key={ episode.id } className="container">
                <img src={ episode.image.medium } alt={ episode.name } />
                <h3>
                  {episode.name}
                </h3>
                <p>
                  Temporada:
                  {' '}
                  {episode.season}
                  {' '}
                  Episódio:
                  {' '}
                  {episode.number}
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={ () => toggleFavorites(episode) }
                >
                  {favorites && favorites
                    .some((ep) => ep.id === episode.id)
                    ? 'Remover dos Favoritos'
                    : 'Favoritar'}
                </button>
              </div>
            ))
        }
      </section>
    </div>
  );
}
