import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const [name, setName] = React.useState("")
	const [description, setDescription] = React.useState("");

	function handleNameChange(event) {
		setName(event.target.value);
	}
	function handleDescriptionChange(event) {
		setDescription(event.target.value)
	}
	const currentUser = React.useContext(CurrentUserContext);

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	function handleSubmit(event) {
		event.preventDefault();
		onUpdateUser({
			name,
			about: description,
		})
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			name='edit'
			title='Редактировать профиль'
			isOpen={isOpen}
			onClose={onClose}
			children={
				<>
					<fieldset className="form-edit__input-container">
						<input minLength="2" maxLength="40" required className="form-edit__item form__item" id="name" type="text"
							name="name" placeholder="Введите имя" value={name || ''} onChange={handleNameChange} />
						<span className="form__error" id="name-error"></span>
						<input minLength="2" maxLength="200" required className="form-edit__item form__item" id="about" type="text"
							name="about" placeholder="Укажите профессию" value={description || ''} onChange={handleDescriptionChange} />
						<span className="form__error" id="about-error"></span>
					</fieldset>
					<button type="submit" className="form-edit__submit-button form__submit-button button">
						Сохранить
					</button>
				</>
			}
		/>
	)
}

export default EditProfilePopup;