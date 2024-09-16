export const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
  
  const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    validationSettings
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.classList.add(validationSettings.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.setCustomValidity("");
      inputElement.classList.remove(validationSettings.inputErrorClass);
      errorElement.classList.remove(validationSettings.errorClass);
      errorElement.textContent = "";
    }
  };
  
  export const isValid = (formElement, inputElement, validationSettings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationSettings
      );
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", false);
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
  };
  
  const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationSettings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationSettings.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
  };
  
  export const enableValidation = (validationSettings) => {
    const formList = Array.from(
      document.querySelectorAll(validationSettings.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) { 
        evt.preventDefault(); 
      });
      setEventListeners(formElement, validationSettings);
    });
  };
  
  export const clearValidation = (formElement, validationSettings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationSettings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationSettings.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationSettings);
      inputElement.value = "";
    });
    toggleButtonState(inputList, buttonElement, validationSettings);
  };