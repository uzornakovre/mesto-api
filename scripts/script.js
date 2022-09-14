const popup = document.querySelector('.popup');

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const popupClose = popup.querySelectorAll('.popup__close');
const popupContainer = popup.querySelectorAll('.popup__container')
const popupEditContainer = popup.querySelector('.popup__container_type_edit-profile');
const popupPlaceContainer = popup.querySelector('.popup__container_type_new-place');
const popupImageContainer = popup.querySelector('.popup__container_type_image');
const popupImage = popup.querySelector('.popup__image');
const popupImageCaption = popup.querySelector('.popup__image-caption');

const nameInput = popupEditContainer.querySelector('.popup__form-input_content_name');
const jobInput = popupEditContainer.querySelector('.popup__form-input_content_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placeName = popupPlaceContainer.querySelector('.popup__form-input_content_place-name');
const imageUrl = popupPlaceContainer.querySelector('.popup__form-input_content_image-url');

// Модальные окна

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popupContainer.forEach((container) => {
    container.classList.remove('popup__container_opened');
  });
}

popupClose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', closePopup);
});


function openEditPopup() {
  openPopup();
  popupEditContainer.classList.add('popup__container_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

buttonEdit.addEventListener('click', openEditPopup);

function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupEditContainer.addEventListener('submit', submitEditForm);

function openPlacePopup() {
  openPopup();
  popupPlaceContainer.classList.add('popup__container_opened');
}

buttonAdd.addEventListener('click', openPlacePopup);

function submitAddForm(evt) {
  evt.preventDefault();
  createCard(placeName.value, imageUrl.value);
  placeName.value = '';
  imageUrl.value = '';
  closePopup();
}

popupPlaceContainer.addEventListener('submit', submitAddForm);

function openImage(image, caption) {
  openPopup();
  popupImageContainer.classList.add('popup__container_opened');
  popupImage.src = image;
  popupImage.alt = `Изображение ${caption}`;
  popupImageCaption.textContent = caption;
}

// Карточки

const cardTemplate = document.querySelector('#cardTemplate').content;
const elementsList = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  createCard(item.name, item.link);
})

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = link;
  cardElementImage.alt = `Изображение ${name}`;
  cardElement.querySelector('.element__title').textContent = name;

  elementsList.prepend(cardElement);

   cardElementImage.addEventListener('click', () => {
    openImage(link, name);
  });

  likeCard(cardElement);
  deleteCard();
}

function deleteCard() {
  const cardDeleteButton = document.querySelectorAll('.elements__button-remove');

  cardDeleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.elements__list-item');
      listItem.remove();
    });
  });
}

function likeCard(elem) {
  const likeButton = elem.querySelector('.element__button-like');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__button-like_active');
  });
}