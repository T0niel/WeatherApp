import sun from "../assets/icons/sun.png";
import night from "../assets/icons/night-mode.png";
import themeModifier from "./mode";
import viewWeatherInfoUtil from "./viewWeatherInfoUtil"
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/main.css";

/*Import icons*/
import "../assets/icons/cloud.svg";
import "../assets/icons/day-cloudy.svg";
import "../assets/icons/day-sunny.svg";
import "../assets/icons/night-alt-cloudy.svg";
import "../assets/icons/night-clear.svg";
import "../assets/icons/rain.svg";
import "../assets/icons/snow.svg";
import "../assets/icons/thunderstorm.svg";

import WMOCodes from "./weatherAssets/weatherWMOCodeInfo.json";

/*REMOVE ME*/
import plot from "./weatherAssets/plot"


/*Weather Assets*/
import openMeteoWeather from "./weatherAssets/openMeteoWeather.mjs";
import Weather from "./weatherAssets/weather.js";

/*Debugging weatherIcons*/
import weatherIcon from "./weatherDOMAssets/weatherIcon.js";
import weatherIconGenerator from "./weatherDOMAssets/weatherIconGenerator.js";

import weatherDOMManipulator from "./weatherDOMAssets/weatherDomUtil.js"


themeModifier(".mode-icon", sun, night, ":root");


weatherDOMManipulator(
  Weather,
  weatherIcon,
  weatherIconGenerator,
  document.querySelector(".header-wrapper"),
  document.querySelector(".more-weather-info-container"),
  WMOCodes,
  null,
  document.querySelector(".weather-select")
);

