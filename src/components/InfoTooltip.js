import closeImagePath from "../images/close-icon.svg";
import regSuccessPath from "../images/reg-success.svg";
import regFailPath from "../images/reg-fail.svg";

function InfoTooltip({ isOpen, onClose, isLoginSuccess }) {
	return (
		<section className={isOpen ? `popup-tooltip popup popup_opened` : `popup`} >
			<div className="popup__container popup-tooltip__container ">
				<img src={closeImagePath} alt="Закрытие окна" className="popup__close" onClick={onClose} />
				<img src={isLoginSuccess ? regSuccessPath : regFailPath} className="popup-tooltip__image"
					alt={isLoginSuccess ? 'Успешно' : 'Провал'} />
				<p className="popup-tooltip__text ">{isLoginSuccess ? 'Вы успешно зарегистрировались!'
					: 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
			</div>
		</section>
	)
}
export default InfoTooltip;

