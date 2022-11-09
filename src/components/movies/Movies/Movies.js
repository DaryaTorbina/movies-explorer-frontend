import Footer from '../../Basic/Footer/Footer';
import Header from '../../Basic/Header/Header';
import Navigation from '../../Basic/Navigation/Navigation';
import More from '../More/More';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm />
        <MoviesCardList type="all" />
        <More />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
