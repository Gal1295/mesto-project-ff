import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  createElement,
  removeCard,
  likeCard,
  placesListCard,
} from "./components/card.js";

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const profilEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEdit = document.forms.editProfile;
const profileEditName = profileEdit.querySelector(".popup__input_type_name");
const profileEditDescription = profileEdit.querySelector(
  ".popup__input_type_description"
);
const newPlaceForm = document.forms.newPlace;
const newPlaceCardName = newPlaceForm.elements["place-name"];
const newPlaceCardlink = newPlaceForm.elements["link"];
const picturePopup = document.querySelector(".popup_type_image");
const picturePopupImage = document.querySelector(".popup__image");
const picturePopupCaption = document.querySelector(".popup__caption");
const popupCloseButtons = document.querySelectorAll(".popup");

function openPicturePopup(link, alt) {
  picturePopupImage.src = link;
  picturePopupImage.alt = alt;
  picturePopupCaption.textContent = alt;
  openPopup(picturePopup);
}

function addCardToPlacesList(evt) {
  evt.preventDefault();
  const addedCard = {
    name: newPlaceCardName.value,
    link: newPlaceCardlink.value,
    alt: newPlaceCardName.value,
  };
  const newPlaceCard = createElement(
    addedCard,
    removeCard,
    likeCard,
    openPicturePopup
  );
  placesListCard.prepend(newPlaceCard, placesListCard.firstChild);
  closePopup(popupNewCard);
  newPlaceForm.reset();
}

function setprofileEdit() {
  profileEditName.value = profileTitle.textContent;
  profileEditDescription.value = profileDescription.textContent;
}

function changeProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditName.value;
  profileDescription.textContent = profileEditDescription.value;
  closePopup(popupProfileEdit);
  profileEdit.reset();
}

function openProfilePopup() {
  setprofileEdit();
  openPopup(popupProfileEdit);
}

newPlaceForm.addEventListener("submit", addCardToPlacesList);
profileEdit.addEventListener("submit", changeProfile);

profileAddButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});
profilEditButton.addEventListener("click", openProfilePopup);

popupCloseButtons.forEach(function (popupUse) {
  popupUse.addEventListener("click", function (evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popupUse);
    }
  });
});

initialCards.forEach(function (item) {
  const card = createElement(item, removeCard, likeCard, openPicturePopup);
  placesListCard.prepend(card);
});
