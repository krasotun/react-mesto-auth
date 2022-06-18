class Auth {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers
	}
	_checkServerStatus(res) {
		if (res.ok) {
			return res.json()
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}
	registration({ password, email }) {
		return fetch(`${this._baseUrl}/signup`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				password,
				email
			}).then
		}).then(this._checkServerStatus)
	}
	authorization({ password, email }) {
		return fetch(`${this._baseUrl}/signin`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				password,
				email
			}).then
		}).then(this._checkServerStatus)
	}

	checkTokenValidity(token) {
		return fetch(`${this._baseUrl}`, {
			method: "GET",
			headers: {
				...this._headers, Authorization: `Bearer ${token}`
			}
		}).then(this._checkServerStatus)
	}
}

const auth = new Auth({
	baseUrl: 'https://auth.nomoreparties.co',
	headers: {
		"Content-Type": "application/json"
	}
})

export default auth;

