import sun from "../assets/icons/sun.png";
import night from "../assets/icons/night-mode.png";
import themeModifier from "./mode";
import "../styles/reset.css";
import "../styles/loading.css";
import "../styles/main.css";

themeModifier(".mode-icon", sun, night, ":root");
