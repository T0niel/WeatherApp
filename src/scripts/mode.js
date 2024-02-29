export default function changeMode(
  modifierSelector,
  modifierIconLightURL,
  modifierIconDarkURL,
  rootElementSelector,
) {
  const modifier = document.querySelector(modifierSelector);
  const rootElement = document.querySelector(rootElementSelector);

  if(!modifier.style.backgroundImage){
    modifier.style.backgroundImage = `url(${modifierIconLightURL})`;
  }

  modifier.addEventListener("click", () => {
    rootElement.classList.toggle(
      rootElement.classList.contains("dark") ? "white" : "dark"
    );

    modifier.style.backgroundImage = rootElement.classList.contains("white")
      ? `url(${modifierIconDarkURL})`
      : `url(${modifierIconLightURL})`;
  });
}
