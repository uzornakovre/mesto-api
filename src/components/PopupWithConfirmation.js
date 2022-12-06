import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._submitForm = this._popup.querySelector('#delete-card');
  }

  open(id, handleConfirmDelete) {
    super.open();
    this._id = id;
    this._handleConfirmDelete = handleConfirmDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDelete = (evt) => {
      evt.preventDefault();
      this._handleConfirmDelete(this._id);
    }
    this._submitForm.addEventListener('submit', this._confirmDelete);
  }

  renderLoading(isLoading, submitType) {
    if (isLoading) {
      this._popup.querySelector('.popup__form-submit').textContent = 'Удаление...';
    } else {
      this._popup.querySelector('.popup__form-submit').textContent = submitType;
    }
  }
}