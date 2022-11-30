export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameSelector = name;
    this._jobSelector = about;
    this._avatar = avatar;
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
    this._avatar.src = data.avatar;
  }

  // setUserAvatar(data) {
  //   this._avatar.src = data.avatar;
  // }
}