import { Link, NavLink } from "react-router-dom";
import Sign from "./Sign";

function Register() {
	return (
		<>
			<Sign
				title='Регистрация'
				buttonText='Зарегистрироваться'
			>
				<input required className="form__item form__item_dark" id="email" type="email" name="email" placeholder="E-mail" />
				<span className="form__error" id="email-error"></span>
				<input required className="form__item form__item_dark" id="password" type="password"
					name="password" placeholder="Пароль" />
				<span className="form__error" id="password-error"></span>
			</Sign>

			<p className="registration__text">Уже зарегистрированы?</p>
			<Link to="/sign-in" className="registation__link">Войти</Link>
		</>
	)
}

export default Register;