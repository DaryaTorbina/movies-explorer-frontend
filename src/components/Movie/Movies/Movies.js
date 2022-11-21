import './Movies.css';
import { useState, useEffect } from 'react';
import movi from '../../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../Preloader/Preloader';
import { shortFilmDuration } from "../../../utils/constants";

function Movies({ onSaveDone, saveArray, openErrorPopup }) {
  const [initMovies, setInitMovies] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [shortFilms, setShortFilms] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // загрузка последнего рез- поиска данного пользователя
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitMovies(movies);
      if (localStorage.getItem('shortFilms') === 'true') {
        setFilmsArray(movies);
        setShortFilms(false);
      }
      else {
        setFilmsArray(filterMoviesByDuration(movies));
        setShortFilms(true);
      }
      if (localStorage.getItem('inputValue')) {
        setInputValue(localStorage.getItem('inputValue'));
      }
    }
    if (localStorage.getItem('allMovies')) {
      setAllFilms(JSON.parse(localStorage.getItem('allMovies')));
    }
  }, []);

  // положение чекбокса
  useEffect(() => {
    if (localStorage.getItem('shortFilms')) {
      if (localStorage.getItem('shortFilms') === 'true') {
       setShortFilms(false);
      }
      else {
        setShortFilms(true);
      }
    }
  }, []);

  // инпут в поиске установка
  useEffect(() => {
    if (localStorage.getItem('inputValue')) {
      setInputValue(localStorage.getItem('inputValue'));
    }
  }, []);

  // сортировка!!

  // сортировка фильмов по длительности
  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => movie.duration <= shortFilmDuration);
  };

  // сортировка фильмов по ключевому слову
  function filterMoviesKeyW(movies, keywords) {
    const moviesByKeyworlds = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keywords.toLowerCase())//без регистра
    });
    return moviesByKeyworlds;
  };

  // сортировка фильмов, с сохранением в localStorage
  function handleSetInitialMovies(movies, keywords) {
    const moviesCardList = filterMoviesKeyW(movies, keywords);
    moviesCardList.length === 0 ? setNotFound(true) : setNotFound(false);
    setInitMovies(moviesCardList);
    localStorage.setItem('shortFilms', !shortFilms);
    localStorage.setItem('movies', JSON.stringify(moviesCardList));
    localStorage.setItem('inputValue', keywords);

    if (shortFilms) {
      setFilmsArray(filterMoviesByDuration(moviesCardList));
      filterMoviesByDuration(moviesCardList).length === 0 ? setNotFound(true) : setNotFound(false);
    }
    else {
      setFilmsArray(moviesCardList);
    }
  }

  // поиск фильмов в апи
  function getMovies(keywords) {
    if (allFilms.length) {
      handleSetInitialMovies(allFilms, keywords);
    }
    else {
      setIsDisabled(true);
      setSearchLoad(true);
      movi.getInitialCards()
        .then((movies) => {
          setAllFilms(movies);
          handleSetInitialMovies(movies, keywords);
          localStorage.setItem('allMovies', JSON.stringify(movies))
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
        .finally(() => {
          setSearchLoad(false);
          setIsDisabled(false);
        });
    }
  }

  // переключение чекбокса "короткометражки" с поиском
  function checkedShotMovies() {
    setShortFilms(!shortFilms);
    if (!shortFilms) {
      if (filterMoviesByDuration(initMovies).length === 0) {
        setFilmsArray(filterMoviesByDuration(initMovies));
        setNotFound(true);
      }
      else {
        setFilmsArray(filterMoviesByDuration(initMovies));
        setNotFound(false);
      }
    }
    else {
      initMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setFilmsArray(initMovies);
    }
    localStorage.setItem('shortFilms', shortFilms);
  }

  return (
    <main className="main">
      <SearchForm
        getMovies={getMovies}
        checkedShotMovies={checkedShotMovies}
        shortFilms={shortFilms}
        inputValue={inputValue}
        openErrorPopup={openErrorPopup}
        isDisabled={isDisabled}
      />
      {
        searchLoad ? <Preloader /> :

        error ?
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :

        <MoviesCardList
          filmsArray={filmsArray}
          notFound={notFound}
          onSaveDone={onSaveDone}
          saveArray={saveArray}
          savedPage={false}
        />
      }
    </main>
  );
}

export default Movies;
