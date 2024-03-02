import sun from "../assets/icons/sun.png";
import night from "../assets/icons/night-mode.png";
import themeModifier from "./mode";
import viewWeatherInfoUtil from "./viewWeatherInfoUtil"
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/main.css";
import plot from "./weatherAssets/plot"

/*Import icons*/
import "../assets/icons/cloud.svg";
import "../assets/icons/day-cloudy.svg";
import "../assets/icons/day-sunny.svg";
import "../assets/icons/night-alt-cloudy.svg";
import "../assets/icons/night-clear.svg";
import "../assets/icons/rain.svg";
import "../assets/icons/snow.svg";
import "../assets/icons/thunderstorm.svg";

/*Weather Assets*/
import openMeteoWeather from "./weatherAssets/openMeteoWeather.mjs";
import Weather from "./weatherAssets/weather.js";

/*Debugging weatherIcons*/
import weatherIcon from "./weatherDOMAssets/weatherIcon.js";
import weatherIconGenerator from "./weatherDOMAssets/weatherIconGenerator.js";

import weatherDOMManipulator from "./weatherDOMAssets/weatherDomUtil.js"

weatherDOMManipulator(
  Weather,
  weatherIcon,
  weatherIconGenerator(
    "./day-cloud.svg",
    "./cloud.svg",
    "./night-alt-cloudy.svg",
    "./night-clear.svg",
    "./day-sunny.svg",
    "./rain.svg",
    "./rain.svg",
    "./snow.svg",
    "./snow.svg",
    "./thunderstorm.svg"
  ),
  document.querySelector(".header-wrapper"),
  document.querySelector(".weather-info-card-container"),
  document.querySelector("#search-location")
);

themeModifier(".mode-icon", sun, night, ":root");
viewWeatherInfoUtil(".prev-btn", ".next-btn", ".weather-info-card-container", 10, 5);
plot(["Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saterday", "Sunday"], [0, 0, 0, 0, 0, 0, 0]);