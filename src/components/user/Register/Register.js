import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../../images/logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({ handleRegister, isDisabled }) {
  const [valuesInput, setValuesInput] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //данные инпутов
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      if (isEmail(value)) {
        e.target.setCustomValidity('');
      } else {
          e.target.setCustomValidity('Некорректный формат E-mail');
      }
    }
    setValuesInput({ ...valuesInput, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

	//регистрация
	function handleSubmit(e) {
		e.preventDefault();
    handleRegister(valuesInput);
	}

  return (
    <main className="main">
      <section className="input-form">
        <div className="input-form__container">
          <Link to="/" className="input-form__logo"><img className="input-register__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="input-form__title">Добро пожаловать!</h1>
          <form name="formregister" className="input-form__section" noValidate onSubmit={handleSubmit}>

            <p className="input-register__text">Имя</p>
            <input
              type="text"
              value={valuesInput.name || ''}
              onChange={handleChange}
              className="input-register__input"
              name="name"
              id="name"
              required minLength="2"
              maxLength="30"
              pattern='^[A-Za-zА-Яа-я /s -]+$'
              disabled={isDisabled ? true : ''}
            />
            <p className={`input-register__error ${errors.name ? 'input-register__error_visible' : ''}`}>{errors.name}</p>

            <p className="input-register__text">E-mail</p>
            <input
              type="email"
              value={valuesInput.email || ''}
              onChange={handleChange}
              className="input-register__input"
              name="email"
              id="email"
              required
              disabled={isDisabled ? true : ''}
            />
						<p className={`input-register__error ${errors.email ? 'input-register__error_visible' : ''}`}>{errors.email}</p>

            <p className="input-register__text">Пароль</p>
            <input
              type="password"
              value={valuesInput.password || ''}
              onChange={handleChange}
              className="input-register__input"
              name="password"
              id="password"
              required
              minLength="6"
              maxLength="30"
              disabled={isDisabled ? true : ''}
            />
						<p className={`input-register__error ${errors.password ? 'input-register__error_visible' : ''}`}>{errors.password}</p>

            <button type="submit" className={`input-form__button ${isValid ? "" : "input-register__save-btn_disabled"}`} disabled={(!isValid || isDisabled) ? true : ''}>Зарегистрироваться</button>

					</form>
					<Link to="/signin" className="input-form__text">Уже зарегистрированы? <span className="input-form__link">Войти</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
