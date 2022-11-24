import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { shortFilmDuration } from "../../../utils/constants";

function SavedMovies({ saveArray, onMovieDelete, openErrorPopup }) {
  const [initMovies, setInitMovies] = useState([]);
  const [filmsArray, setFilmsArray] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [shortFilms, setShortFilms] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // загрузка сохраненных фильмов
  useEffect(() => {
    if (saveArray) {
      const movies = saveArray;
      setInitMovies(movies);
      if (localStorage.getItem('shortMoviesSaved')) {
        if (localStorage.getItem('shortMoviesSaved') === 'true') {
          setFilmsArray(movies);
          setShortFilms(false);
        }
        else {
          setFilmsArray(filterMoviesByDuration(movies));
          setShortFilms(true);
        }
      }
      else {
        setFilmsArray(movies);
        setShortFilms(false);
      }

      if (localStorage.getItem('inputValueSaved')) {
        setInputValue(localStorage.getItem('inputValueSaved'));
      }
    }
  }, [saveArray]);

  // сортировка фильмов по длительности
  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => movie.duration <= shortFilmDuration);
  };

  // сортировка фильмов по ключевому слову
  function filterMoviesKeyW(movies, keywords) {
    const moviesByKeyworlds = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keywords.toLowerCase())
    });
    return moviesByKeyworlds;
  };

  // сортировка фильмов
  function handleSetInitialMovies(movies, keywords) {
    const moviesCardList = filterMoviesKeyW(movies, keywords);
    moviesCardList.length === 0 ? setNotFound(true) : setNotFound(false);
    setInitMovies(moviesCardList);
    localStorage.setItem('shortMoviesSaved', !shortFilms);
    localStorage.setItem('inputValueSaved', keywords);

    if (shortFilms) {
      setFilmsArray(filterMoviesByDuration(moviesCardList));
      filterMoviesByDuration(moviesCardList).length === 0 ? setNotFound(true) : setNotFound(false);
    }
    else {
      setFilmsArray(moviesCardList);
    }
  }

  // поиск фильмов в базе сохраненных фильмов
  function getSavedMovies(keywords) {
    if (saveArray) {
      handleSetInitialMovies(saveArray, keywords);
    }
  }

  // переключение чекбокса "короткометражки"
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
    localStorage.setItem('shortMoviesSaved', shortFilms);
  }

  return (
    <main className="main">
      <SearchForm
        checkedShotMovies={checkedShotMovies}
        shortFilms={shortFilms}
        getSavedMovies={getSavedMovies}
        openErrorPopup={openErrorPopup}
        inputValue={inputValue}
      />

      <MoviesCardList
        filmsArray={filmsArray}
        notFound={notFound}
        saveArray={saveArray}
        savedPage={true}
        onMovieDelete={onMovieDelete}
      />

    </main>
  );
}

export default SavedMovies;
