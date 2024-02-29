import sun from "../assets/icons/sun.png";
import night from "../assets/icons/night-mode.png";
import themeModifier from "./mode";
import viewWeatherInfoUtil from "./viewWeatherInfoUtil"
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/main.css";
import plot from "./weatherAssets/plot"

themeModifier(".mode-icon", sun, night, ":root");
viewWeatherInfoUtil(".prev-btn", ".next-btn", ".weather-info-card-container", 10, 5);
plot(["Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saterday", "Sunday"], [0, 0, 0, 0, 0, 0, 0]);