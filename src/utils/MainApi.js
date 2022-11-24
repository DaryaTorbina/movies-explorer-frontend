import { BASE_URL } from "./constants";

//обработка ошибок
const onError = res => {
  if (res.ok) {
    return res.json();
    console.log(res.json);
  }
  return Promise.reject(res.status);
};

//класс Api
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
		this._headers = headers;
	};

	//получаем профиль
	getBasicInformation() {
		return fetch (`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._headers.authorization
			}
		})
		.then (onError);
	};

	//добавление элементов при загрузке страницы как в место
  getInitialCards() {
		return fetch(`${this._baseUrl}/movies`, {
			headers: {
				authorization: this._headers.authorization
			}
		})
		.then (onError);
	};

	//вся информация о пользователе и о карточках как в место
	getAppInfo() {
    return Promise.all([this.getBasicInformation(), this.getInitialCards()]);
  };


  //изменение информации о пользователе
	editProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email
			})
		})
		.then (onError);
	};

	// регистрация
  register(data) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password
      })
    })
    .then (onError);
  }

  // авторизация
  login(data) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password

      })
    })
    .then (onError);
  }
////////////card movi film

	//добавление карточки пользователем bit
	addCard(movie) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
			body: JSON.stringify({
				country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.created_at,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id
			})
		})
		.then (onError);
	};

	//удаление карточки как в место
	deleteCard(deleteId) {
		return fetch(`${this._baseUrl}/movies/${deleteId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
		})
		.then (onError);
	};

  // проверка токена
  check(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then (onError);
  }
}

const tokenBase = `Bearer ${localStorage.getItem('token')}`;

//класса api
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: tokenBase,
    'Content-Type': 'application/json'
  }
});

export default api;
