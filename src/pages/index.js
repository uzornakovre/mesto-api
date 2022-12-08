import './index.css';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import { popupEdit, 
         popupPlace, 
         popupImageViewer,
         buttonEdit,
         buttonAdd,
         formEdit,
         formAdd,
         formAvatar,
         profileName,
         profileJob,
         profileAvatar,
         profileAvatarContainer,
         nameInput,
         jobInput,
         popupAvatar,
         popupDeleteCard
        } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'a67dcede-ed6f-4bc9-92bc-dd4c6eb33b08',
    'Content-Type': 'application/json'
  }
}); 

const imageViewer = new PopupWithImage(popupImageViewer);
const profileEditor = new PopupWithForm(popupEdit, formEdit, submitEditForm);
const cardLoader = new PopupWithForm(popupPlace, formAdd, submitAddForm);
const avatarEditor = new PopupWithForm(popupAvatar, formAvatar, submitAvatarForm);
const cardRemover = new PopupWithConfirmation(popupDeleteCard);
const userInfo = new UserInfo({
  name:   profileName,
  about:  profileJob,
  avatar: profileAvatar
});

// Листенеры кнопок на странице

buttonEdit.addEventListener('click', () => {
  profileEditor.open();
  const userInfoCurrent = userInfo.getUserInfo();
  nameInput.value = userInfoCurrent.name,
  jobInput.value = userInfoCurrent.about,
  validatorEditProfile.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  cardLoader.open();
  validatorAddCard.resetValidation();
});

profileAvatarContainer.addEventListener('click', () => {
  avatarEditor.open();
  validatorEditAvatar.resetValidation();
});

// Данные пользователя

let userId = '';

api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    api.getInitialCards()
    .then((cardsData) => {
      const initialCards = cardsData;
      cardSection.renderItems(initialCards);
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке карточек: ${error}`);
    })
  })
  .catch((error) => {
    console.log(`Ошибка при получении данных о пользователе: ${error}`);
  });

function submitEditForm(userData) {
  profileEditor.renderLoading(true);
  api.changeUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      profileEditor.close();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении данных о пользователе: ${error}`);
    })
    .finally(() => {
      profileEditor.renderLoading(false, 'Сохранить');
    })
}

function submitAvatarForm(userData) {
  avatarEditor.renderLoading(true);
  api.changeUserAvatar(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      avatarEditor.close()
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => {
      avatarEditor.renderLoading(false, 'Сохранить');
    })
}

// Листенеры модальных окон

profileEditor.setEventListeners();
cardLoader.setEventListeners();
imageViewer.setEventListeners();
avatarEditor.setEventListeners();
cardRemover.setEventListeners();

// Карточки

import { cardList } from '../utils/constants.js';

const cardSection = new Section({
  renderer: (itemData) => {
    return createCard(itemData);
  }
}, cardList);

function createCard(itemData) {
  const cardElement = new Card({
    itemData,
    userId: userId,
    handleDeleteClick: (id, handleConfirmDelete) => {
      cardRemover.open(id, handleConfirmDelete);
    },
    handleConfirmDelete: (id) => {
      cardRemover.renderLoading(true)
      api.deleteCard(id)
        .then(() => {
          cardElement.removeCard();
          cardRemover.close();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`);
        })
        .finally(() => {
          cardRemover.renderLoading(false, 'Да');
        })
    },
    handleLikeClick: (id, owner) => {
      if (cardElement.isLiked()) {
      api.dislikeCard(id, owner)
        .then((cardData) => {
          cardElement.refreshLikes(cardData.likes);
          cardElement.setLikeStatus(cardData.likes.length);
        })
        .catch((error) => {
          console.log(`Ошибка при удалении лайка: ${error}`);
        })
      } else {
        api.likeCard(id, owner)
          .then((cardData) => {
            cardElement.refreshLikes(cardData.likes);
            cardElement.setLikeStatus(cardData.likes.length);
          })
          .catch((error) => {
            console.log(`Ошибка при постановке лайка: ${error}`);
          })
      }
    },
    handleCardClick: imageViewer,
  }, 
    '#cardTemplate',
    );

  const card = cardElement.createCard()
  return card; 
}

// Добавление карточки

function submitAddForm(data) {
  cardLoader.renderLoading(true);
  const cardData = {
    name: data.place,
    link: data.url
  };
  api.createCard(cardData)
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      cardLoader.close();
    })
    .catch((error) => {
      console.log(`Ошибка при создании новой карточки: ${error}`);
    })
    .finally(() => {
      cardLoader.renderLoading(false, 'Создать');
    })
}

// Валидация

import { settingsList } from '../utils/constants.js';

const validatorEditProfile = new FormValidator(settingsList, popupEdit);
const validatorAddCard = new FormValidator(settingsList, popupPlace);
const validatorEditAvatar = new FormValidator(settingsList, popupAvatar);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();