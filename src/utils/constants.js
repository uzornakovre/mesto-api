// DOM 

export const popupEdit = document.querySelector('.popup_type_edit-profile');
export const popupPlace = document.querySelector('.popup_type_new-place');
export const popupImageViewer = document.querySelector('.popup_type_image');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');

export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');

export const formEdit = popupEdit.querySelector('#profile_edit');
export const formAdd = popupPlace.querySelector('#new_place');
export const formAvatar = popupAvatar.querySelector('#avatar_edit');
export const formDeleteCard = popupDeleteCard.querySelector('#delete-card');

export const nameInput = popupEdit.querySelector('.popup__form-input_content_name');
export const jobInput = popupEdit.querySelector('.popup__form-input_content_job');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');
export const profileAvatar = profileAvatarContainer.querySelector('.profile__avatar');

export const placeName = popupPlace.querySelector('.popup__form-input_content_place-name');
export const imageUrl = popupPlace.querySelector('.popup__form-input_content_image-url');

export const avatarUrl = popupAvatar.querySelector('.popup__form-input_content_avatar');

// Карточки

export const cardList = document.querySelector('.elements__list');

// Валидация

export const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error'
}