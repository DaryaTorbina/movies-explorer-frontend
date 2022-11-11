import './SearchForm.css';
import find from '../../../images/find.svg';

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <div className="search__line">
          <input className="search__input" placeholder="Фильм" type="text" required />
          <button type="submit" className="search__button"><img src={find} alt="изображение не доступно"></img></button>
        </div>
        <div className="search__toggle">
          <label className="search__check">
            <input type="checkbox" className="search__checkbox" />
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
