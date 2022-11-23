// DOM 

export const popupEdit = document.querySelector('.popup_type_edit-profile');
export const popupPlace = document.querySelector('.popup_type_new-place');
export const popupImageViewer = document.querySelector('.popup_type_image');
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');

export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');

export const formEdit = popupEdit.querySelector('#profile_edit');
export const formAdd = popupPlace.querySelector('#new_place');

export const nameInput = popupEdit.querySelector('.popup__form-input_content_name');
export const jobInput = popupEdit.querySelector('.popup__form-input_content_job');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');

export const placeName = popupPlace.querySelector('.popup__form-input_content_place-name');
export const imageUrl = popupPlace.querySelector('.popup__form-input_content_image-url');

// Карточки

export const cardList = document.querySelector('.elements__list');

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// Валидация

export const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error'
}