import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ getMovies, checkedShotMovies, shortFilms, inputValue, getSavedMovies, openErrorPopup, isDisabled }) {
  const [keyWords, setKeyWords] = useState(inputValue);
  const { pathname } = useLocation();

  // строка поиска при загрузке страницы
  useEffect(() => {
    setKeyWords(inputValue);
  }, [inputValue]);

  //что в инпуте
  const handleChange = (e) => {
    setKeyWords(e.target.value);
  };

  // короткометр или нет. переключение
	function handleChangeShotFilms(e) {
    checkedShotMovies();
  }

	// поиск - если ничего не ввели то отправляемся на попап с текстом ошибки. иначе..
	function handleSubmit(e) {
		e.preventDefault();
    if (keyWords === '') {
      openErrorPopup('Нужно ввести ключевое слово');
    }
    else {
      pathname==='/movies' ? getMovies(keyWords) : getSavedMovies(keyWords);
    }
  }

  return (
    <section className="search section">
          <div className="search__container">
        <div className="search__icon"></div>
        <form className="search__form" name="searchForm" onSubmit={handleSubmit} noValidate>
          <input
            className="search__input"
            value={keyWords || ''}
            onChange={handleChange}
            type="text"
            name="filmInput"
            id="filmInput"
            required
            placeholder="Фильм"
            minLength="1"
            maxLength="100"
            disabled={isDisabled ? true : ''}
          />
          <button type="submit" className="search__search-btn" disabled={isDisabled ? true : ''}></button>
        </form>
        <div className="search__shortFilms">
          <div className="search__checkbox-group">
            <input type="checkbox" checked={shortFilms ? true : false} onChange={handleChangeShotFilms} className="search__checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="search__slider"></label>
          </div>
          <p className="search__short-text">Короткометражки</p>
        </div>

      </div>
      <div className='search__line secttion'></div>
    </section>
  );
}

export default SearchForm;
