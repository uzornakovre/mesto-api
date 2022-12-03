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
  })
  .catch((error) => {
    console.log(`Ошибка при получении данных о пользователе: ${error}`);
  });

function submitEditForm(userData) {
  profileEditor.renderLoading(true);
  api.changeUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((error) => {
      console.log(`Ошибка при изменении данных о пользователе: ${error}`);
    })
    .finally(() => {
      profileEditor.renderLoading(false, 'Сохранить');
    })
  profileEditor.close();
}

function submitAvatarForm(userData) {
  avatarEditor.renderLoading(true);
  api.changeUserAvatar(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => {
      avatarEditor.renderLoading(false, 'Сохранить');
    })
  avatarEditor.close()
}

// Листенеры модальных окон

profileEditor.setEventListeners();
cardLoader.setEventListeners();
imageViewer.setEventListeners();
avatarEditor.setEventListeners();

// Карточки

import { cardList } from '../utils/constants.js';

const card = new Section({
  renderer: (itemData) => {
    const cardElement = new Card({
      itemData,
      userId: userId,
      handleDeleteClick: (id, handleConfirmDelete) => {
        cardRemover.open();
        cardRemover.setEventListeners(id, handleConfirmDelete);
      },
      handleConfirmDelete: (id) => {
        api.deleteCard(id)
          .then(() => {
            cardElement.remove();
          })
          .catch((error) => {
            console.log(`Ошибка при удалении карточки: ${error}`);
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
    card.addItem(cardElement.createCard());
  }
}, cardList);

api.getInitialCards()
  .then((cardsData) => {
    const initialCards = cardsData;
    card.renderItems(initialCards.reverse());
  })
  .catch((error) => {
    console.log(`Ошибка при загрузке карточек: ${error}`);
  });

// Добавление карточки

function submitAddForm(data) {
  cardLoader.renderLoading(true);
  const cardData = {
    name: data.place,
    link: data.url
  };
  api.createCard(cardData)
    .then((cardData) => {
      card.renderItems([cardData]);
    })
    .catch((error) => {
      console.log(`Ошибка при создании новой карточки: ${error}`);
    })
    .finally(() => {
      cardLoader.renderLoading(false, 'Создать');
    })
  cardLoader.close();
}

// Валидация

import { settingsList } from '../utils/constants.js';

const validatorEditProfile = new FormValidator(settingsList, popupEdit);
const validatorAddCard = new FormValidator(settingsList, popupPlace);
const validatorEditAvatar = new FormValidator(settingsList, popupAvatar);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();