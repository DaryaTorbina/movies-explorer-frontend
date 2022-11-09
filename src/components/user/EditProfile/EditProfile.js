import './EditProfile.css';
import {Link} from 'react-router-dom';

function EditProfile() {
  return (
    <section className="editprofile">
      <form className="editprofile__form">
        <h3 className="editprofile__hello">Привет!</h3>
        <div className="editprofile__inputs">
          <p className="editprofile__input">Имя</p>
          <div className="editprofile__input-text editprofile__input-text_name">
            <input className="editprofile__data" defaultValue="Имя" required />
          </div>
          <div className="editprofile__input-text editprofile__input-text_email">
            <input className="editprofile__data" defaultValue="mail@mail.ru" required />
          </div>
          <p className="editprofile__input">E-mail</p>
        </div>
        <Link to="/profile" className="editprofile__edit-button">Редактировать</Link>
        <Link to="/" className="editprofile__out-button">Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default EditProfile;
