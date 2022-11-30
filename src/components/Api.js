export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._checkStatus)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(this._checkStatus)
  }

  changeUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name:  userData.name,
        about: userData.about
      })
    }).then(this._checkStatus);
  }

  changeUserAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatarUrl
      })
    }).then(this._checkStatus);
  }

  createCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(this._checkStatus)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkStatus)
  }

  likeCard(id, owner) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        likes: [owner]
      })
    }).then(this._checkStatus)
  }

  dislikeCard(id, owner) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        likes: [owner]
      })
    }).then(this._checkStatus)
  }
}