import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

import Movies from '../../../utils/Movies';

function MoviesCardList({ type }) {
   const [movies, setMovies] = React.useState([]);

  function testGetMovies() {
    setMovies(Movies);
  }

  React.useEffect(() => {
    testGetMovies();
  }, []);

  return (
    <ul className="movie-card-list section" aria-label="Список фильмов">
      {movies.map((movie) => (

          <MoviesCard
            key={movie.id}
            name={movie.name}
            duration={movie.duration}
            thumbnail={
              'https://api.nomoreparties.co/' +
              movie.image.formats.thumbnail.url
            }
            type={type}
          />

      ))}
    </ul>
  );
}

export default MoviesCardList;
