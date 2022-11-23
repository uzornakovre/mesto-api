import Popup from './Popup.js';
import {
  nameInput,
  jobInput,
  placeName,
  imageUrl, 
 } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitFunction) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._submitFunction = submitFunction;
  }

  open() {
    super.open();
    this._formSelector.reset();
  }

  _getInputValues() {
    return {
      name:  nameInput.value,
      about:   jobInput.value,
      place: placeName.value,
      url:   imageUrl.value
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}