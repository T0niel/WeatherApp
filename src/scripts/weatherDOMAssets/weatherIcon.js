/*the images should be an object where the keys are represent the WMO codes and the image URLs as the values*/
export default function (domElement, loadingSignal, WMOCode, images) {
  if (WMOCode < 0 || WMOCode > 99) {
    throw new Error("Invalid WMO code");
  }

  if (loadingSignal) {
    loadingSignal.style.display = "none";
  }

  //Add the image
  const image = document.createElement("img");

  for (let prop in images) {
    if (WMOCode == prop) {
      //Found the corresponding value
      image.src = images[prop];
      break;
    }
  }

  domElement.append(image);
}
