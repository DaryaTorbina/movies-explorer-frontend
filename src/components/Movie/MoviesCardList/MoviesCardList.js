import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect, useCallback } from 'react';
import { LargeScreen, MobileScreen, addlarge, addmedium, addSmall,addLargeScreen,addMobileScreen } from "../../../utils/constants";

function MoviesCardList({ moviesMore, filmsArray, notFound, onSaveDone, saveArray, savedPage, onMovieDelete }) {
  const { pathname } = useLocation();
  const getScreenWidth = useCallback(() => window.screen.width, []);
  const [screen, setScreen] = useState(getScreenWidth());
  const [resultArray, setResultArray] = useState(filmsArray);

    // отображение массива с карточками
  useEffect(() => {
    if (!savedPage) {
      if (filmsArray) {
        if (screen >= LargeScreen){
          const result = filmsArray.slice(0, addlarge);
          setResultArray(result);
        }else if (screen<=LargeScreen && screen>MobileScreen){
        const result = filmsArray.slice(0, addmedium);
          setResultArray(result);}
        else {
          const result = filmsArray.slice(0, addSmall);
          setResultArray(result);
        }
      }
    }
    else {
      setResultArray(filmsArray);
    }
  }, [filmsArray, screen, savedPage]);

  // получаем разрешение экрана пользователя
  useEffect(() => {
    window.addEventListener('resize', resizeFunction);
    function handleResize() {
      setScreen(getScreenWidth());
    };

    let timer;
    function resizeFunction() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = false;
          handleResize();
        }, 500);
      }
    }
    return () => window.removeEventListener('resize', resizeFunction);
  }, [getScreenWidth]);

  // кнопка "Еще"
  function clickMore() {

    const count = resultArray.length;
    if (screen >=LargeScreen) {
      if (filmsArray.length > resultArray.length) {
        const newCards = filmsArray.slice(count, count + addLargeScreen);
        setResultArray([...resultArray, ...newCards]);
      }
    }
    else {
      const newCards = filmsArray.slice(count, count + addMobileScreen);
      setResultArray([...resultArray, ...newCards]);
    }
  }

  return (
    <section className={`movies section ${pathname === '/saved-movies' ? 'movies__saved': ''}`}>
 <>


     {
        notFound ? <p className="movies__error">Ничего не найдено</p> :
        <>
        <ul className="movie-card-list">
        { resultArray.map((movie) => (

					<MoviesCard
						key={movie.id || movie.movieId}
						movie={movie}
            onSaveDone={onSaveDone}
            saveArray={saveArray}
            onMovieDelete={onMovieDelete}
					/>
				))}</ul>


      {(pathname === '/movies' && resultArray.length < filmsArray.length) &&
            <div className="more">
        <button type="button" className="more__button" onClick={clickMore}>Еще</button>
      </div>
      }</>
    }
    </>
    </section>
  );
}

export default MoviesCardList;
