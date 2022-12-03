export class Card {
  constructor({ 
      itemData,
      userId,
      handleDeleteClick,
      handleConfirmDelete,
      handleLikeClick,
      handleCardClick,
    }, 
    templateSelector) {
    this._name = itemData.name;
    this._link = itemData.link;
    this._likes = itemData.likes;
    this._id = itemData._id;
    this._owner = itemData.owner;
    this._ownerId = itemData.owner._id;
    this._userId = userId;
    this._handleDeleteClick = handleDeleteClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;

    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);

    return cardElement;
  }

  remove() {
    this._element.remove();
  }

  _requestRemove() {
    this._handleDeleteClick(this._id, this._handleConfirmDelete);
  }

  _openCard() {
    this._handleCardClick.open(this._link, this._name);
  }

  _setEventListeners() {
    this._cardDeleteButton = this._element.querySelector('.elements__button-remove');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._cardImage = this._element.querySelector('.element__image');

    this._cardDeleteButton.addEventListener('click', this._requestRemove.bind(this));
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
    this._cardImage.addEventListener('click', this._openCard.bind(this));
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = `Изображение ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    this._enableRemove();
    this.setLikeStatus(this._likes.length);
    
    return this._element;
  }

  _enableRemove() {
    if (this._ownerId === this._userId) {
      this._cardDeleteButton.classList.add('elements__button-remove_active');
    }
  }

  _activateLikeButton() {
    this._likeButton.classList.add('element__button-like_active');
  }

  _unactivateLikeButton() {
    this._likeButton.classList.remove('element__button-like_active');
  }

  setLikeStatus(likesStatus) {
    this._element.querySelector('.element__like-counter').textContent = likesStatus;
    if (this.isLiked()) {
      this._activateLikeButton();
    } else {
      this._unactivateLikeButton();
    }
  }

  isLiked() {
    let result = 0;
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        result += 1;
      } else {
      }
    });
    if (result === 1) {
      return true
    } else return false
  }

  refreshLikes(likes) {
    this._likes = likes;
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this._id, this._owner);
  }
}