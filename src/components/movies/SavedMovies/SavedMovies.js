import Footer from '../../Basic/Footer/Footer';
import Header from '../../Basic/Header/Header';
import Navigation from '../../Basic/Navigation/Navigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm />
        <MoviesCardList type="saved" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
