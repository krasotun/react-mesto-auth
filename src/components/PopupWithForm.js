import closeImagePath from "../images/close-icon.svg"

function PopupWithForm({ isOpen, name, title, onClose, onSubmit, children }) {
	return (
		<section className={isOpen ? `popup-${name} popup popup_opened` : `popup-${name} popup`} >
			<div className="popup__container">
				<img src={closeImagePath} alt="Закрытие окна" className="popup__close" onClick={onClose} />
				<form className={`form-${name} form`} onSubmit={onSubmit}>
					<h2 className={`form-${name}__title`}>{title}</h2>
					{children}
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm;