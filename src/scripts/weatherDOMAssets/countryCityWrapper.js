import citySuggestions from "../citySuggestionAssets/citySuggestions";
import openMeteoWeather from "../weatherAssets/openMeteoWeather.mjs";

export default function (
  moreWeatherInfoContainer,
  cities,
  weatherContructor,
  WMOData
) {
  const countryCityWrapper = document.createElement("div");
  countryCityWrapper.classList.add("country-city-wrapper");

  const biggerHeader = document.createElement("h1");
  biggerHeader.classList.add("bigger-header");
  biggerHeader.textContent = "tempatures in cities on this country";

  countryCityWrapper.appendChild(biggerHeader);

  const countryCityWeatherInfo = document.createElement("div");
  countryCityWeatherInfo.classList.add("country-city-weather-info");

  countryCityWrapper.appendChild(countryCityWeatherInfo);

  const maxCities = 10;

  //Shuffle the cities
  cities.sort(() => 0.5 - Math.random());

  cities.forEach(async (city, index) => {
    if (index < maxCities) { 
      const countryCityInfoCard = document.createElement("div");
      countryCityInfoCard.classList.add("country-city-info-card");
      countryCityInfoCard.textContent = `${city}`;

      const temp = document.createElement("span");
      temp.classList.add("temp");

      const data = await citySuggestions(city, 1);

      let weather = null;
      data.forEach(async (city) => {
        weather = await weatherContructor(
          openMeteoWeather(city.latitute, city.longitude, WMOData)
        );
        temp.textContent = `${weather.getCurrentWeatherData().currentTemp}`;
        //We only need one city
        return;
      });

      countryCityInfoCard.appendChild(temp);
      countryCityWeatherInfo.appendChild(countryCityInfoCard);
    }
  });

  countryCityWrapper.appendChild(countryCityWeatherInfo);
  moreWeatherInfoContainer.appendChild(countryCityWrapper);
}
