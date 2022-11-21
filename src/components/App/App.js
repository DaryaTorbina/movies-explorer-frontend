import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "../Basic/Header/Header";
import Site from "../MainSite/Site/Site";
import Movies from "../Movie/Movies/Movies";
import SavedMovies from "../Movie/SavedMovies/SavedMovies";
import Register from "../user/Register/Register";
import Login from "../user/Login/Login";
import Profile from "../user/Profile/Profile";
import NotFound from "../NotFound404/NotFound";
import Footer from "../Basic/Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import api from "../../utils/MainApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import successIcon from "../../images/popup-success-icon.svg";
import failIcon from "../../images/popup-fail-icon.svg";

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [saveArray, setSaveArray] = useState([]);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState("");



  // проверка токена
  function checkToken() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      api
        .check(jwt)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // регистрация
  function handleRegister(data) {
    setIsDisabled(true);
    api
      .register(data)
      .then((res) => {
        if (res) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При регистрации пользователя произошла ошибка");
        }
        openErrorPopup();
        setIcon(failIcon);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  // авторизация
  function handleLogin(data) {
    setIsDisabled(true);
    api
      .login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
          setMessage("Авторизация прошла успешно!");
          setIcon(successIcon);
        }
      })
      .catch((err) => {
        if (err === 401) {
          setMessage("Вы ввели неправильный логин или пароль");
        } else {
          setMessage("При авторизации пользователя произошла ошибка");
        }
        setIcon(failIcon);
      })
      .finally(() => {
        setIsDisabled(false);
      });
    openErrorPopup();
  }

  // начальный профиль, загрузка сохраненных карточек
  useEffect(() => {
    checkToken();
    if (loggedIn) {
      api._headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      api
        .getBasicInformation()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });

      api
        .getInitialCards()
        .then((movies) => {
          setSaveArray(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // изменение профиля
  function handleEditProfile(data) {
    setIsDisabled(true);
    api
      .editProfile(data)
      .then((result) => {
        setCurrentUser(result);
        setMessage("Профиль успешно изменен!");
        setIcon(successIcon);
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При обновлении профиля произошла ошибка");
        }
        setIcon(failIcon);
      })
      .finally(() => {
        setIsDisabled(false);
      });
    openErrorPopup();
  }

  // выход
  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  }
// с карточками фильма
  // выбор=сохранение и снятие выбора удаление и сохраненных
  function onSaveDone(movie) {
    if (saveArray) {
      const isSaved = saveArray.some((i) => i.movieId === movie.id);
      if (!isSaved) {
        api
          .addCard(movie)
          .then((newMovie) => {
            setSaveArray([newMovie, ...saveArray]);
          })
          .catch((err) => {
            setMessage("Произошла ошибка при сохранении фильма!");
            setIcon(failIcon);
            openErrorPopup();
          });
      } else {
        const deleteMovie = saveArray.filter((film) => {
          return film.movieId === movie.id;
        });
        const deleteMovieId = deleteMovie[0]._id;
        api
          .deleteCard(deleteMovieId)
          .then((newMovie) => {
            setSaveArray((state) =>
              state.filter((c) => c.movieId !== movie.id)
            );
          })
          .catch((err) => {
            setMessage("Произошла ошибка при удалении фильма!");
            setIcon(failIcon);
            openErrorPopup();
          });
      }
    }
  }

  // удаление фильма из сохраненных
  function onMovieDelete(movie) {
    if (saveArray) {
      const deleteMovie = saveArray.filter((film) => {
        return film._id === movie._id;
      });

      if (deleteMovie.length) {
        const deleteMovieId = deleteMovie[0]._id;
        api
          .deleteCard(deleteMovieId)
          .then((newMovie) => {
            setSaveArray((state) => state.filter((c) => c._id !== movie._id));
          })
          .catch((err) => {
            setMessage("Произошла ошибка при удалении фильма!");
            setIcon(failIcon);
            openErrorPopup();
          });
      }
    }
  }

  //попап с ошибкой открыть
  function openErrorPopup() {
    setErrorPopupOpen(true);
  }

  //попап с ошибкой закрыть
  function closeErrorPopup() {
    setErrorPopupOpen(false);
  }

  // открытие попапа с ошибкой, если не заполнено поле поиска фильма  search
  function openErrorPopupSearch(message) {
    setMessage(message);
    setIcon(failIcon);
    setErrorPopupOpen(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header loggedIn={loggedIn} />
        ) : (
          ""
        )}

        <Switch>
          <Route exact path="/">
            <Site />
          </Route>

          <ProtectedRoute
            loggedIn={loggedIn}
            path="/movies"
            component={Movies}
            onSaveDone={onSaveDone}
            saveArray={saveArray}
            openErrorPopup={openErrorPopupSearch}
            isLoading={isLoading}
          />

          <ProtectedRoute
            loggedIn={loggedIn}
            path="/saved-movies"
            component={SavedMovies}
            onSaveDone={onSaveDone}
            saveArray={saveArray}
            onMovieDelete={onMovieDelete}
            openErrorPopup={openErrorPopupSearch}
            isLoading={isLoading}
          />

          <ProtectedRoute
            loggedIn={loggedIn}
            path="/profile"
            component={Profile}
            isLoading={isLoading}
            handleEditProfile={handleEditProfile}
            signOut={signOut}
            isDisabled={isDisabled}
          />

          <Route path="/signup">
            {() =>
              !loggedIn ? (
                <Register
                  handleRegister={handleRegister}
                  isDisabled={isDisabled}
                />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="/signin">
            {() =>
              !loggedIn ? (
                <Login handleLogin={handleLogin} isDisabled={isDisabled} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>

        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}

        <InfoTooltip
          image={icon}
          text={message}
          isOpen={errorPopupOpen}
          isClose={closeErrorPopup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
