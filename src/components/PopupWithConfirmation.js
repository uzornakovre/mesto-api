import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._submitButton = document.querySelector('#confirm-delete');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this._submitFunction(this._getInputValues());
    });
  }
}