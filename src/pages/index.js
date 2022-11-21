import './index.css';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { popupEdit, 
         popupPlace, 
         popupImageViewer,
         buttonEdit,
         buttonAdd,
         formEdit,
         formAdd,
         profileName,
         profileJob,
         nameInput,
         jobInput
        } from '../utils/constants.js';

const imageViewer = new PopupWithImage(popupImageViewer);
const profileEditor = new PopupWithForm(popupEdit, formEdit, submitEditForm);
const cardLoader = new PopupWithForm(popupPlace, formAdd, submitAddForm);
const userInfo = new UserInfo({
  name: profileName,
  job: profileJob
});

buttonEdit.addEventListener('click', () => {
  profileEditor.open();
  const userInfoCurrent = userInfo.getUserInfo();
  nameInput.value = userInfoCurrent.name,
  jobInput.value = userInfoCurrent.job,
  validatorEditProfile.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  cardLoader.open();
  validatorAddCard.resetValidation();
});

function submitEditForm(data) {
  userInfo.setUserInfo(data);
  profileEditor.close();
}

function submitAddForm(data) {
  const cardData = [{
    name: data.place,
    link: data.url
  }];
  card.renderItems(cardData);
  cardLoader.close();
}

function submitDeleteCard() {

}

profileEditor.setEventListeners();
cardLoader.setEventListeners();
imageViewer.setEventListeners();

// Карточки

import { cardList, initialCards } from '../utils/constants.js'; 

const card = new Section({
  renderer: (item) => {
    const cardElement = new Card(item, '#cardTemplate', imageViewer).createCard();
    card.addItem(cardElement);
  }
}, cardList);

card.renderItems(initialCards);

// Валидация

import { settingsList } from '../utils/constants.js';

const validatorEditProfile = new FormValidator(settingsList, popupEdit);
const validatorAddCard = new FormValidator(settingsList, popupPlace);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();