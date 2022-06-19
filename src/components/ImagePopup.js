import closeImagePath from "../images/close-icon.svg"

function ImagePopup({ card, onClose }) {
	return (
		<section className={card.link ? `popup-card popup popup_opened` : `popup-card popup`} >
			<div className="popup-card__container">
				<img src={closeImagePath} alt="Закрытие окна" className="popup__close" onClick={onClose} />
				<img src={card.link}
					className="popup-card__image" alt={card.name} />
				<p className="popup-card__text">{card.name}</p>
			</div>
		</section>
	)
};

export default ImagePopup;