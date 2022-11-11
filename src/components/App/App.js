import { Route, Routes } from 'react-router-dom';
import Movies from '../movies/Movies/Movies';
import UserProfile from '../user/UserProfile/UserProfile';
import SavedMovies from '../movies/SavedMovies/SavedMovies';
import NotFound404 from '../NotFound404/NotFound404';
import './App.css';
import Register from '../user/Register/Register';
import Login from '../user/Login/Login';
import Site from '../Main/Site/Site';

function App() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
