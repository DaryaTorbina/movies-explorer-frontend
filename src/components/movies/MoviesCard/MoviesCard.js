import './MoviesCard.css';

import CardButton from '../CardButton/CardButton';
import React from 'react';


function MoviesCard({ name, duration, thumbnail, type }) {

  const [isSaved, setIsSaved] = React.useState(false);

  function handleClickSave() {
    setIsSaved((state) => !state);
  }

  const ref = React.useRef();

  function handleClickDelete() {
    setIsSaved(false);
    ref.current.remove();
  }

  return (
    <li className="movie-card" ref={ref}>
      <div className="movie__description">
      <h3 className="movie-card__name">{name}</h3>
      <div className='button-save-close'>
       {type === 'all' ? (
        isSaved ? (
          <CardButton
            className="movie-card__button"
            type="done"
            onClick={handleClickSave}
          />
        ) : (
          <CardButton
            className="movie-card__button"
            type="save"
            onClick={handleClickSave}
          />
        )
      ) : (
        <CardButton
          className="movie-card__button"
          type="delete"
          onClick={handleClickDelete}
        />
      )}
      </div>
           <p className="movie-card__duration">{duration}</p>
      </div>
      <img
        src={thumbnail}
        alt={`Кадр из фильма ${name}`}
        className="movie-card__thumbnail"
      />

    </li>
  );
}

export default MoviesCard;
