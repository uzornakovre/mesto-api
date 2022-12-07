import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, submitFunction) {
    super(popupSelector);
    this._form = form;
    this._submitFunction = submitFunction;
    this._inputList = [...this._form.querySelectorAll('.popup__form-input')];
  }

  open() {
    super.open();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.id] = input.value;
    })
    return this._inputValues
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  renderLoading(isLoading, submitType) {
    if (isLoading) {
      this._popup.querySelector('.popup__form-submit').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__form-submit').textContent = submitType;
    }
  }
}