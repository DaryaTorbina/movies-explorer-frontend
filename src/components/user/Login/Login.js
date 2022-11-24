import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import isEmail from 'validator/es/lib/isEmail';
import logo from '../../../images/logo.svg';

function Login({ handleLogin, isDisabled }) {
  const [valuesInput, setValuesInput] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // что в инпутах
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

  //авторизация
	function handleSubmit(e) {
		e.preventDefault();
		handleLogin(valuesInput);
  }

  return (
    <main className="main">
      <section className="input-form">
        <div className="input-form__container">
          <Link to="/" className="input-form__logo"><img className="input-login__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="input-form__title">Рады видеть!</h1>
          <form name="formlogin" className="input-form__section" noValidate onSubmit={handleSubmit}>

            <p className="input-login__text">E-mail</p>
            <input
              type="email"
              value={valuesInput.email || ''}
              onChange={handleChange}
              className="input-login__input"
              name="email"
              id="email"
              required
              disabled={isDisabled ? true : ''}
            />
            <p className={`input-login__error ${errors.email ? 'input-login__error_visible' : ''}`}>{errors.email}</p>

            <p className="input-login__text">Пароль</p>
            <input
              type="password"
              value={valuesInput.password || ''}
              onChange={handleChange}
              className="input-login__input"
              name="password"
              id="password"
              required
              minLength="6"
              maxLength="30"
              disabled={isDisabled ? true : ''}
            />
            <p className={`input-login__error ${errors.password ? 'input-login__error_visible' : ''}`}>{errors.password}</p>

            <button type="submit" className={`input-form__button ${isValid ? "" : "input-login__save-btn_disabled"}`} disabled={(!isValid || isDisabled) ? true : ''}>Войти</button>
          </form>
					<Link to="/signup" className="input-login__link">Еще не зарегистрированы?<span className="input-login__green"> Регистрация</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Login;


