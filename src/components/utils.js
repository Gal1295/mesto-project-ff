export function renderLoading(
    isLoading,
    button,
    initialText = "Сохранить",
    loadingText = "Сохранение..."
  ) {
    if (isLoading) {
      button.textContent = loadingText;
    } else {
      button.textContent = initialText;
    }
  }