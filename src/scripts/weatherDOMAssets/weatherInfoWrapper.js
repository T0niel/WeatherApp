import viewWeatherInfoUtil from "../viewWeatherInfoUtil";
import moment from "moment";

export default async function (
  moreWeatherInfoContainer,
  amount,
  weather,
  country,
  city,
  images,
  weatherIcon
) {
  const weatherInfoWrapper = document.createElement("div");
  weatherInfoWrapper.classList.add("weather-info-wrapper");

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.classList.add("prev-btn");

  weatherInfoWrapper.appendChild(prevBtn);

  const weatherInfoCardContainer = document.createElement("div");
  weatherInfoCardContainer.classList.add("weather-info-card-container");

  //Cards
  const data = await weather.getWeatherDataFromDays(new Date().getDate() + amount);

  for (let i = 0; i < amount; i++) {
    const card = document.createElement("div");
    card.classList.add("weather-info-card");

    const location = document.createElement("div");
    location.classList.add("location");
    location.textContent = `${country}, ${city}`;
    card.appendChild(location);

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("icon-wrapper");

    card.appendChild(iconWrapper);

    weatherIcon(iconWrapper, null, data[i].weatherCode, images);

    const tempatureInfo = document.createElement("div");

    const temp = document.createElement("div");
    const min = document.createElement("span");
    min.classList.add("temp");
    min.textContent = `min: ${data[i].minTemp}`;

    const max = document.createElement("span");
    max.classList.add("temp");
    max.textContent = `max: ${data[i].maxTemp}`;

    temp.appendChild(min);
    temp.appendChild(max); 

    tempatureInfo.appendChild(temp);

    const weatherTextInfo = document.createElement("div");
    weatherTextInfo.classList.add("weather-text-info");
    weatherTextInfo.textContent = `${data[i].description}`;

    tempatureInfo.appendChild(weatherTextInfo);

    const day = document.createElement("p");
    day.classList.add("day");
    day.textContent = `${moment().add(i, 'days').calendar().split(" ")[0]}`;
        
    tempatureInfo.appendChild(day);

    card.appendChild(tempatureInfo);

    weatherInfoCardContainer.appendChild(card);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.classList.add("next-btn");

  weatherInfoWrapper.appendChild(weatherInfoCardContainer);

  weatherInfoWrapper.appendChild(nextBtn);

  if(document.querySelector(".country-city-wrapper")){
    moreWeatherInfoContainer.insertBefore(
      weatherInfoWrapper,
      moreWeatherInfoContainer.querySelector(".country-city-wrapper")
    );
  }else{
    moreWeatherInfoContainer.appendChild(weatherInfoWrapper);
  }

  viewWeatherInfoUtil(
    ".prev-btn",
    ".next-btn",
    ".weather-info-card-container",
    10,
    5
  );
}
