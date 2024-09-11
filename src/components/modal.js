export function openPopup(popupUse) {
  popupUse.classList.add("popup_is-opened");
  popupUse.addEventListener("click", closePopapViaOverlay);
  document.addEventListener("keydown", closePopapViaEsc);
}

export function closePopup(popupUse) {
  popupUse.classList.remove("popup_is-opened");
  popupUse.addEventListener("click", closePopapViaOverlay);
  document.removeEventListener("keydown", closePopapViaEsc);
}

function closePopapViaEsc(evt, popupUse) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function closePopapViaOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
