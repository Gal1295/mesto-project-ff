import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createElement, removeCard, likeCard } from "./components/card.js";

import {
  enableValidation,
  validationSettings,
  clearValidation,
} from "./components/validation.js";

import {
  getUserData,
  getInitialCards,
  updateAvatar,
  patchUserData,
  postNewCard,
} from "./components/api.js";

import {renderLoading} from "./components/utils.js";

let userAvatar = "";
let userId = "";

enableValidation(validationSettings);

const placesListCard = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const profilEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEdit = document.forms.editProfile;
const avatarFormElement = document.forms.avatarForm;
const avatarForm = document.querySelector(".popup_type-avatar");
const profileAvatar = document.querySelector(".profile__image");
const profileEditName = profileEdit.querySelector(".popup__input_type_name");
const profileEditDescription = profileEdit.querySelector(
  ".popup__input_type_description"
);
const newPlaceForm = document.forms.newPlace;
const newPlaceCardName = newPlaceForm.elements["place-name"];
const newPlaceCardlink = newPlaceForm.elements["place-link"];
const picturePopup = document.querySelector(".popup_type_image");
const picturePopupImage = document.querySelector(".popup__image");
const picturePopupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

function openPicturePopup(link, name) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  picturePopupCaption.textContent = name;
  openModal(picturePopup);
}

function addCardToPlacesList(evt) {
  evt.preventDefault();
  function makeRequest() {
    return postNewCard(newPlaceCardName.value, newPlaceCardlink.value)
    .then((addedCard) => {
        const newPlaceCard = createElement(
          userId,
          addedCard,
          removeCard,
          likeCard,
          openPicturePopup
        );
        placesListCard.prepend(newPlaceCard);
        closeModal(popupNewCard);
        newPlaceForm.reset();
        clearValidation(newPlaceForm, validationSettings);
      }
    );
  }
  handleSubmit(makeRequest, evt);
}

function setProfileFormInputData() {
  profileEditName.value = profileTitle.textContent;
  profileEditDescription.value = profileDescription.textContent;
}

function changeProfile(evt) {
  evt.preventDefault();
  function makeRequest() {
    const name = profileEditName.value;
    const about = profileEditDescription.value;
    return patchUserData(name, about).then((dataUser) => {
      profileTitle.textContent = dataUser.name;
      profileDescription.textContent = dataUser.about;
      console.dir(name, about);
      closeModal(popupProfileEdit);
      profileEdit.reset();
    });
  }
  handleSubmit(makeRequest, evt);
}

function openProfilePopup() {
  clearValidation(profileEdit, validationSettings);
  setProfileFormInputData();
  openModal(popupProfileEdit);
}

profileAvatar.addEventListener("click", function () {
  clearValidation(avatarForm, validationSettings);
  openModal(avatarForm);
});

function changeProfileAvatar(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  const avatarUrl = avatarFormElement.elements["avatar-link"].value;
  renderLoading(true, saveButton);

  updateAvatar(avatarUrl)
    .then((res) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url('${res.avatar}')`
      );
      closeModal(avatarForm);
    })
    .catch((error) => {
      console.error("Ошибка при сохранении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, saveButton);
    });
}

newPlaceForm.addEventListener("submit", addCardToPlacesList);
profileEdit.addEventListener("submit", changeProfile);
avatarFormElement.addEventListener("submit", changeProfileAvatar);

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});
profilEditButton.addEventListener("click", openProfilePopup);

popups.forEach((popup) => {
  // Для каждого попапа делаем следуюущее
  const closeButton = popup.querySelector(".popup__close"); // Находим в попапе кнопку крестик
  closeButton.addEventListener("click", () => closeModal(popup)); // Устанавливаем слушатель на крестик
  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup);
    } // Устанавливаем слушатель оверлея
  });
});

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach(function (cardData) {
      const card = createElement(
        userId,
        cardData,
        removeCard,
        likeCard,
        openPicturePopup
      );
      placesListCard.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, loadingText);
    });
}
