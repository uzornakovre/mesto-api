import { formDeleteCard } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._submitForm = document.querySelector('#delete-card');
  }

  setEventListeners(id, handleConfirmDelete) {
    super.setEventListeners();
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      handleConfirmDelete(id);
      this.close();
    });
  }
}