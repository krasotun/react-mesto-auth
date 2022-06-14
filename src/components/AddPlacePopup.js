import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const [place, setPlace] = React.useState();
	const [link, setLink] = React.useState();

	React.useEffect(() => {
		if (isOpen) {
			setPlace('');
			setLink("");
		}
	}, [isOpen])

	function handleAddPlaceSubmit(event) {
		event.preventDefault();
		onAddPlace({
			name: place,
			link,
		});
	}

	function handlePlaceChange(event) {
		setPlace(event.target.value);
	}
	function handleLinkChange(event) {
		setLink(event.target.value);
	}

	return (
		<PopupWithForm
			onSubmit={handleAddPlaceSubmit}
			name='add'
			title='Новое место'
			isOpen={isOpen}
			onClose={onClose}
			children={
				<>
					<fieldset className="form-add__input-container">
						<input required minLength="2" maxLength="40" className="form-add__item form__item" id="place" type="text"
							name="place" placeholder="Название" value={place || ''} onChange={handlePlaceChange} />
						<span className="form__error" id="place-error"></span>
						<input required className="form-add__item form__item" id="link" type="url" name="link"
							placeholder="Ссылка на картинку" value={link || ''} onChange={handleLinkChange} />
						<span className="form__error" id="link-error"></span>
					</fieldset>
					<button type="submit" className="form-add__submit-button  form__submit-button button">
						Создать
					</button>
				</>
			}
		/>
	)
}


export default AddPlacePopup;