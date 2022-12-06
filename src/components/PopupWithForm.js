import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, submitFunction) {
    super(popupSelector);
    this._form = form;
    this._submitFunction = submitFunction;
  }

  open() {
    super.open();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = {};
    [...this._form.querySelectorAll('.popup__form-input')].forEach((input) => {
      this._inputList[input.id] = input.value;
    })
    return this._inputList
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}