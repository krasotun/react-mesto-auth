function Sign({ title, children, buttonText, onSubmit }) {
	return (
		<form className="form form_dark" onSubmit={onSubmit}>
			<h2 className="form__title form__title_dark">{title}</h2>
			{children}
			<button className="form__submit-button form__submit-button_dark button">{buttonText}</button>
		</form>
	)
}


export default Sign;