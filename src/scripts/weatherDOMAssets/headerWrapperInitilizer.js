//Depends on these two modules :)
import weather from "../weatherAssets/weather";
import openMeteoWeather from "../weatherAssets/openMeteoWeather.mjs";

export default function(headerWrapper, lat, long, WMOCodes, findCityAPI){
    let workingWeather = weather(openMeteoWeather(lat, long, WMOCodes));

    //Create location paragraph
    const location = document.createElement("p");
}