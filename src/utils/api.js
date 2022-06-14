class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}
	_checkServerStatus(res) {
		if (res.ok) {
			return res.json()
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkServerStatus)
	}
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkServerStatus)
	}
	getInitialInfo() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()])
	}
	setUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		}).then(this._checkServerStatus)
	}
	updateAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: link
			})
		}).then(this._checkServerStatus)
	}
	postNewCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name,
				link
			})
		}).then(this._checkServerStatus)
	}
	changeLikeCardStatus(id, isLiked) {
		if (isLiked) {
			return this.removeLike(id);
		} else {
			return this.addLike(id);
		}
	}
	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers
		}).then(this._checkServerStatus)
	}
	removeLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers
		}).then(this._checkServerStatus)
	}
	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers
		}).then(this._checkServerStatus)
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
	headers: {
		authorization: '99499664-2026-410c-a4a5-b475d910be99',
		'Content-Type': 'application/json'
	}
});

