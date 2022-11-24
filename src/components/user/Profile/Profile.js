import { useState, useContext, useEffect } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import isEmail from 'validator/es/lib/isEmail';

function Profile({ handleEditProfile, signOut, isDisabled }) {
  const currentUser = useContext(CurrentUserContext);
  const [initName, setInitName] = useState(currentUser.name);
  const [initEmail, setInitEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isVarious, setIsVarious] = useState(false);

  //смотрим
  useEffect(() => {
    if (localStorage.getItem('name')) {
      setInitName(localStorage.getItem('name'));
    }
    if (localStorage.getItem('email')) {
      setInitEmail(localStorage.getItem('email'));
    }
  }, []);

  //записываем
	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

  // устанавливаем спроверкой
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name==='name') {
      setName(value);
      if (value !== initName) {
        setIsVarious(true);
      } else {
        setIsVarious(false);
      }
    }

    else {
      setEmail(value);
      if (value !== initEmail) {

        setIsVarious(true);
      } else {

        setIsVarious(false);
      }
      if (isEmail(value)) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Некорректный формат E-mail');
      }
    }
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  // изменяем и в память
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVarious(false);
    setIsValid(false);
    handleEditProfile({ name, email });
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    setInitName(name);
    setInitEmail(email);
  };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form name="formprofile" className="profile__form" noValidate onSubmit={handleSubmit}>
            <p className="profile__text">Имя</p>
            <input
              type="text"
              value={name || ''}
              onChange={handleChange}
              className="profile__input"
              name="name" id="name"
              required minLength="2"
              maxLength="30"
              pattern='^[A-Za-zА-Яа-я /s -]+$'
              disabled={isDisabled ? true : ''}
            />
            <p className={`profile__error ${errors.name ? 'profile__error_visible' : ''}`}>{errors.name}</p>

            <p className="profile__text">E-mail</p>
            <input
              type="email"
              value={email || ''}
              onChange={handleChange}
              className="profile__input"
              name="email" id="email"
              required
              disabled={isDisabled ? true : ''}
            />
            <p className={`profile__error ${errors.email ? 'profile__error_visible' : ''}`}>{errors.email}</p>

						<button type="submit" className={`${(isVarious && isValid) ? "profile__save-btn" : "profile__save-btn-disabled"}`} disabled={((isVarious && isValid) || (isDisabled)) ? '' : true}>Редактировать</button>
          </form>
					<button className="profile__link" onClick={signOut}>Выйти из аккаунта</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
