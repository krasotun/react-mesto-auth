import React from "react";
import { Link } from "react-router-dom";
import Sign from "./Sign";

function Register({ onRegistration }) {

	const [email, setEmail] = React.useState();
	const [password, setPassword] = React.useState();

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault();
		onRegistration(password, email);
	}

	return (
		<>
			<Sign
				title='Регистрация'
				buttonText='Зарегистрироваться'
				onSubmit={handleSubmit}
			>
				<input required className="form__item form__item_dark" id="email"
					type="email" name="email" placeholder="E-mail"
					value={email || ''} onChange={handleEmailChange}
				/>
				<span className="form__error" id="email-error"></span>
				<input required className="form__item form__item_dark" id="password"
					type="password" name="password" placeholder="Пароль"
					value={password || ''} onChange={handlePasswordChange}
				/>
				<span className="form__error" id="password-error"></span>
			</Sign>
			<div className="registration">
				<p className="registration__text">Уже зарегистрированы?</p>
				<Link to="/sign-in" className="registation__link">Войти</Link>
			</div>
		</>
	)
}

export default Register;