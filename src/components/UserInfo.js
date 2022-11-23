export default class UserInfo {
  constructor({ name, about }) {
    this._nameSelector = name;
    this._jobSelector = about;
  }

  getUserInfo() {
    return {
      name:  this._nameSelector.textContent,
      about: this._jobSelector.textContent
    }
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.about;
  }
}