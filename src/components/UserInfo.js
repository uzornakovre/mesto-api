export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name:  this._name.textContent,
      about: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}