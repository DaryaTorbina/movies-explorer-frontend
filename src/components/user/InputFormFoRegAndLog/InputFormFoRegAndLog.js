import './InputFormFoRegAndLog.css';
import { Link } from 'react-router-dom';
import formLogo from '../../../images/logo.svg';

function InputForm({ header, submit, question, path, link, children }) {
  return (
    <section className="input-form">
      <div className="input-form__container">
        <Link to="/" className="input-form__logo"><img src={formLogo} alt="изображение не доступно"></img></Link>
        <h2 className="input-form__title">{header}</h2>
        <form className="input-form__section">
          <div className="input-form__inputs">{children}</div>
          <button type="submit" className="input-form__button" disabled>{submit}</button>
        </form>
        <p className="input-form__text">
          {question} <Link to={path} className="input-form__link">{link}</Link>
        </p>
      </div>
    </section>
  );
}

export default InputForm;
