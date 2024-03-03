import citySuggestions from "../citySuggestionAssets/citySuggestions";
import findNavigationCity from "../citySuggestionAssets/findNavigationCity";
import openMeteoWeather from "../weatherAssets/openMeteoWeather.mjs";
import weatherConstructor from "../weatherAssets/weather";


export default async function (
  headerWrapper,
  weather,
  lat,
  long,
  findCityAPIFactory,
  iconHandeler,
  images,
  WMOdata
) {
  //Create location paragraph
  const location = document.createElement("h1");
  location.classList.add("location");
  const locationInfo = await findCityAPIFactory(lat, long);

  location.textContent = `Location: ${locationInfo.country}, ${locationInfo.city}`;

  headerWrapper.appendChild(location);

  //Icon wrapper
  const iconWrapper = document.createElement("div");
  iconWrapper.classList.add("icon-wrapper");

  iconHandeler(
    iconWrapper,
    null,
    weather.getCurrentWeatherData().weatherCode,
    images
  );

  headerWrapper.appendChild(iconWrapper);

  //tempature Info
  const tempatureInfo = document.createElement("div");
  tempatureInfo.classList.add("tempature-info");

  //Temp paragraph
  const temp = document.createElement("p");
  temp.classList.add("temp");
  temp.textContent = `Current tempature ${
    weather.getCurrentWeatherData().currentTemp
  }`;

  //weather text Info
  const weatherTextInfo = document.createElement("p");
  weatherTextInfo.classList.add("weather-text-info");
  weatherTextInfo.textContent = weather.getCurrentWeatherData().description;

  tempatureInfo.appendChild(temp);
  tempatureInfo.appendChild(weatherTextInfo);

  headerWrapper.appendChild(tempatureInfo);

  // user-search-input-container

  const userSearchInputContainer = document.createElement("div");
  userSearchInputContainer.classList.add("user-search-input-container");

  const input = document.createElement("input");
  input.id = "search-location";
  input.placeholder = "search city...";
  input.type = "text";

  //<div class="suggestion-container"></div>
  const suggestionContainer = document.createElement("div");
  suggestionContainer.classList.add("suggestion-container");

  const keepChecking = [];
  let element = -1;

  input.addEventListener("input", async () => {
    element++;
    let copy = element;

    if (element < keepChecking.length - 1) {
      keepChecking.push(keepChecking[element]);
    } else {
      keepChecking[element] = true;
    }

    //Loop to the previous elements to inform that we don't want that input anymore
    keepChecking.forEach((_, index) => {
      if (index != element) {
        keepChecking[index] = false;
      }
    });

    //reset the suggestions
    while (suggestionContainer.firstChild) {
      suggestionContainer.removeChild(suggestionContainer.firstChild);
    }
    const data = await citySuggestions(input.value);
    if (keepChecking[copy]) {
      const seen = [];
      data.forEach((suggest) => {
        if (!seen.includes(suggest.city)) {
          const suggestion = document.createElement("div");
          suggestion.classList.add("suggestion");
          suggestion.textContent = `${suggest.country}, ${suggest.city}`;
          seen.push(suggest.city);
          suggestionContainer.appendChild(suggestion);
        }
      });
    }
  });

  userSearchInputContainer.appendChild(input);

  userSearchInputContainer.appendChild(suggestionContainer);

  headerWrapper.appendChild(userSearchInputContainer);

  //<div class="nearby-location-container">
  const nearbyLocationContainer = document.createElement("div");
  nearbyLocationContainer.classList.add("nearby-location-container");

  const nearbyLocationPragraph = document.createElement("p");
  nearbyLocationPragraph.classList.add("nearby-location-paragraph");
  nearbyLocationPragraph.textContent = "Other locations in this country";

  nearbyLocationContainer.appendChild(nearbyLocationPragraph);

  //<div class="nearby-location-card-wrapper">
  const nearbyLocationCardWrapper = document.createElement("div");
  nearbyLocationCardWrapper.classList.add("nearby-location-card-wrapper");

  //Create 3 location items
  let index = 0;
  locationInfo.citiesOnCountry.forEach(async (city) => {
    //Get city lat and long
    const cities = await findNavigationCity(city, 1);
    cities.forEach(async (locationCity) => {
      if (index < 3) {
        //Create an location for it and make an weather request
        const weather = await weatherConstructor(
          openMeteoWeather(
            locationCity.latitute,
            locationCity.longitude,
            WMOdata
          )
        );

        const locationItem = document.createElement("div");
        locationItem.classList.add("location-item");

        const locationItemCityName = document.createElement("p");
        locationItemCityName.classList.add("location-item-city-name");
        locationItemCityName.textContent = `City: ${city}`;

        locationItem.appendChild(locationItemCityName);

        const locationItemCountryName = document.createElement("div");
        locationItemCountryName.classList.add("location-item-country-name");
        locationItemCountryName.textContent = `Country ${locationInfo.country}`;

        locationItem.appendChild(locationItemCountryName);

        const locationItemCurrentTemp = document.createElement("div");
        locationItemCurrentTemp.classList.add("location-item-current-temp");
        locationItemCurrentTemp.classList.add("temp");
        locationItemCurrentTemp.textContent = `Current temp: ${
          weather.getCurrentWeatherData().currentTemp
        }`;
        locationItem.appendChild(locationItemCurrentTemp);

        nearbyLocationCardWrapper.appendChild(locationItem);
      }
    });
    index++;
  });

  nearbyLocationContainer.appendChild(nearbyLocationCardWrapper);
  headerWrapper.appendChild(nearbyLocationContainer);
}
