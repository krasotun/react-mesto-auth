import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const avatarRef = React.useRef();

	React.useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen])

	function handleSubmit(event) {
		event.preventDefault();
		onUpdateAvatar(avatarRef.current.value);
	}

	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			name='edit-avatar'
			title='Обновить аватар'
			isOpen={isOpen}
			onClose={onClose}
			children={
				<>
					<fieldset className="form-edit-avatar__input-container">
						<input ref={avatarRef} required className="form-edit-avatar form__item" id="avatar" type="url" name="avatar"
							placeholder="Ссылка на новый аватар" />
						<span className="form__error" id="avatar-error"></span>
					</fieldset>
					<button type="submit" className="form-edit-avatar__submit-button  form__submit-button button">
						Сохранить
					</button>
				</>
			}
		/>
	)
}

export default EditAvatarPopup;