import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__image');
    this._caption = document.querySelector('.popup__image-caption');
  }

  open(image, caption) {
    this._image.src = image;
    this._image.alt = `Изображение ${caption}`;
    this._caption.textContent = caption;
    super.open();
  }
}