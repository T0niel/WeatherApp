import sun from "../assets/icons/sun.png";
import night from "../assets/icons/night-mode.png";
import themeModifier from "./mode";
import viewWeatherInfoUtil from "./viewWeatherInfoUtil"
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/main.css";
import plot from "./weatherAssets/plot"
const json = require("./weatherAssets/weatherWMOCodeInfo.json");
import weather from "./weatherAssets/openMeteoWeather.mjs";

const obj = weather(42.834848, 20.899853, json);
obj.then((a) => {
  const date = new Date();
  date.setMonth(3);
  date.setDate(1);
  a.getWeatherDataOnDateFromNow(date);
});

themeModifier(".mode-icon", sun, night, ":root");
viewWeatherInfoUtil(".prev-btn", ".next-btn", ".weather-info-card-container", 10, 5);
plot(["Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saterday", "Sunday"], [0, 0, 0, 0, 0, 0, 0]);