import { removeFullCard, addLikeCard, deleteLikeCard } from "./api.js";
const templateCard = document.querySelector("#card-template").content;

export function createElement(
  userId,
  cardData,
  removeCard,
  likeCard,
  openPicturePopup
) {
  const card = templateCard.querySelector(".places__item").cloneNode(true);
  const imageCard = card.querySelector(".card__image");
  const titleCard = card.querySelector(".card__title");
  const deleteButtonCard = card.querySelector(".card__delete-button");
  const likeButtonCard = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  imageCard.src = cardData.link;
  imageCard.alt = "Фотография с места - " + cardData.name;
  titleCard.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (userId !== cardData.owner._id) {
    deleteButtonCard.style.display = "none";
  } else {
    deleteButtonCard.addEventListener("click", () => {
      const cardId = cardData._id;
      removeCard(card, cardId);
    });
  }
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButtonCard.classList.add("card__like-button_is-active");
  }
  likeButtonCard.addEventListener("click", () => {
    likeCard(cardLikeCounter, likeButtonCard, cardData);
  });
  imageCard.addEventListener("click", function () {
    openPicturePopup(cardData.link, cardData.name);
  });

  return card;
}

export function removeCard(card, cardId) {  
  const cardToRemove = card.closest(".card");
  removeFullCard(cardId)
    .then(() => {
      cardToRemove.remove();
    })
    .catch((err) => {
      console.error(`"Произошла ошибка при удалении карточки:", ${err}`);
    });
};  

export function likeCard(cardLikeCounter, likeButtonCard, cardData) {
  if (likeButtonCard.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardData._id)
      .then((res) => {
        likeButtonCard.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
  } else {
    addLikeCard(cardData._id)
      .then((res) => {
        likeButtonCard.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
  }
}