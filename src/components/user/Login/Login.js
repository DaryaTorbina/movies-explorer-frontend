import InputForm from '../InputFormFoRegAndLog/InputFormFoRegAndLog';

function Register() {
  return (
    <InputForm
        header="Рады видеть!"
        submit="Войти"
        question="Еще не зарегистрированы?"
        link="Регистрация"
        path="/signup"
        children={(
            <>
                <label className="input-form__input">
                    <p className="input-form__input-text">E-mail</p>
                    <input type="email" className="input-form__field" defaultValue="pochta@yandex.ru" required />
                    <p className="input-form__error-text">Что-то пошло не так...</p>
                </label>
                <label className="input-form__input">
                    <p className="input-form__input-text">Пароль</p>
                    <input type="password" className="input-form__field input-form__field_color-error" defaultValue="••••••••••••••" required />
                    <p className="input-form__error-text input-form__error-text_display">Что-то пошло не так...</p>
                </label>
            </>
        )}
    />
  );
}

export default Register;
