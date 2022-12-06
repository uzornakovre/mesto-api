export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
    this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

  renderLoading(isLoading, submitType) {
    if (isLoading) {
      this._popup.querySelector('.popup__form-submit').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__form-submit').textContent = submitType;
    }
  }
}