import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useState, useEffect } from 'react';

function MoviesCard({ movie, onSaveDone, saveArray, onMovieDelete }) {
  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (saveArray) {
      setIsSaved(saveArray.some(i => i.movieId === movie.id));
    }
  }, [saveArray])

  // выбираем фильм = с охранением или удаляем= оменяем выбор
	function handleLikeClick() {
		onSaveDone(movie);
  }

  // удалить фильм из сохраненных
  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  // длительность
  const durationMovie = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  }

  return (
    <li className="movie-card">
        <div className="movie__description">
          <h3 className="movie-card__name">{movie.nameRU}</h3>
          <div className='button-save-close'>

        {pathname === '/saved-movies' ? (
          <button type="button" className="movie-card__button movie-card__button_delete" onClick={handleDeleteClick}></button>
        ) : (
          <button type="button" className={isSaved ? " movie-card__button movie-card__button_active " :"movie-card__button movie-card__button_inactive" } onClick={handleLikeClick}></button>
        )}
        </div>
         <p className="movie-card__duration">{durationMovie(movie.duration)}</p>
      </div>
      <a href={movie.trailerLink} target="blank"><img className="movie-card__thumbnail" src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} /></a>
    </li>
  );
}

export default MoviesCard;
