const templateCard = document.querySelector("#card-template").content;
export const placesListCard = document.querySelector(".places__list");

export function createElement(
  cardData,
  removeCard,
  likeCard,
  openPicturePopup
) {
  const card = templateCard.querySelector(".card").cloneNode(true);
  const imageCard = card.querySelector(".card__image");
  const titleCard = card.querySelector(".card__title");
  const deleteButtonCard = card.querySelector(".card__delete-button");
  const likeButtonCard = card.querySelector(".card__like-button");

  imageCard.src = cardData.link;
  imageCard.alt = "Фотография с места - " + cardData.name;
  titleCard.textContent = cardData.name;

  deleteButtonCard.addEventListener("click", removeCard);
  likeButtonCard.addEventListener("click", likeCard);
  imageCard.addEventListener("click", function () {
    openPicturePopup(cardData.link, cardData.name);
  });

  return card;
}

export function removeCard(cardData) {
  const deletedCard = cardData.target.closest(".card");
  deletedCard.remove();
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
