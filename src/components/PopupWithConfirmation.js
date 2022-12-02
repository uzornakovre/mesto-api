import { formDeleteCard } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._submitForm = this._popup.querySelector('#delete-card');
  }

  setEventListeners(id, handleConfirmDelete) {
    super.setEventListeners();
    this._confirmDelete = (evt) => {
      evt.preventDefault();
      handleConfirmDelete(id);
      this._submitForm.removeEventListener('submit', this._confirmDelete);
      this.close();
    }
    this._submitForm.addEventListener('submit', this._confirmDelete);
  }
}