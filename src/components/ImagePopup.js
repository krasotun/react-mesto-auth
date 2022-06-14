import closeImagePath from "../images/close-icon.svg"

function ImagePopup(props) {
	return (
		<section className={props.card.link ? `popup-card popup popup_opened` : `popup-card popup`} >
			<div className="popup-card__container">
				<img src={closeImagePath} alt="Закрытие окна" className="popup__close" onClick={props.onClose} />
				<img src={props.card.link}
					className="popup-card__image" alt={props.card.name} />
				<p className="popup-card__text">{props.card.name}</p>
			</div>
		</section>
	)
};

export default ImagePopup;