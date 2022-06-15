function Sign({ title, children, buttonText }) {
	return (
		<form className="form form_dark">
			<h2 className="form__title form__title_dark">{title}</h2>
			{children}
			<button className="form__submit-button form__submit-button_dark button">{buttonText}</button>
		</form>
	)
}


export default Sign;