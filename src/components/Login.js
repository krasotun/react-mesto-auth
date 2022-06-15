import Sign from "./Sign";
function Login() {
	return (
		<Sign
			title='Вход'
			buttonText='Войти'
		>
			<input required className="form__item form__item_dark" id="email" type="email" name="email" placeholder="E-mail" />
			<span className="form__error" id="email-error"></span>
			<input required className="form__item form__item_dark" id="password" type="password"
				name="password" placeholder="Пароль" />
			<span className="form__error" id="password-error"></span>
		</Sign>

	)
}

export default Login;