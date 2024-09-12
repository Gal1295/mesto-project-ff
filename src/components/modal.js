export function openModal(popupUse) {
  popupUse.classList.add("popup_is-opened");
  popupUse.addEventListener("mousedown", closePopapViaOverlay);
  document.addEventListener("keydown", closePopapViaEsc);
}

export function closeModal(popupUse) {
  popupUse.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopapViaEsc);
}

function closePopapViaEsc(evt, popupUse) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function closePopapViaOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
