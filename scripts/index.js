// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createElement(item, deleteCard) {
  const card = templateCard.querySelector(".card").cloneNode(true);
  const imageCard = card.querySelector(".card__image");
  const titleCard = card.querySelector(".card__title");

  imageCard.src = item.link;
  imageCard.alt = '' + item.name;
  titleCard.textContent = item.name;

  const deleteButtonCard = card.querySelector(".card__delete-button");

  deleteButtonCard.addEventListener("click", deleteCard);

  return card;
};

// @todo: Функция удаления карточки
function removeCard(event) {
  const deletedCard = event.target.closest(".card");
  deletedCard.remove();
};
// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const card = createElement(item, removeCard);
  const placesListCard = document.querySelector(".places__list");
  placesListCard.prepend(card);
});
