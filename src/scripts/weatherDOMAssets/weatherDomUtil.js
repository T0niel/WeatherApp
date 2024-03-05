import openMeteoWeather from "../weatherAssets/openMeteoWeather.mjs";
import headerWrapperInitilizer from "./headerWrapperInitilizer";
import findCity from "../citySuggestionAssets/findCity";
import weatherInfoWrapper from "./weatherInfoWrapper";
import countryCityWrapper from "./countryCityWrapper";
import plotDom from "./plotDom";
import plot from "../weatherAssets/plot";

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {

      // Options for watchPosition
      const options = {
        timeout: 2000, 
        maximumAge: 100 * 10 * 60 * 60 * 24,
      };

      // Watch the user's position
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Clear the watch position once we have received the data
          navigator.geolocation.clearWatch(watchId);
          resolve(position.coords);
        },
        (error) => {
          // Clear the watch position in case of errors
          navigator.geolocation.clearWatch(watchId);
          reject(error);
        },
        options
      );
    }
  });
}

function handleUserLocationError(fn, ...param) {
  return (...param) => {
    return new Promise((resolve, reject) => {
      fn(...param)
        .catch(async (e) => {
          try {
            const fetchedData = await fetch(
              "https://api.ipify.org?format=json"
            );
            const response = await fetchedData.json();
            const ipAddress = response.ip;
            //After getting the IP make sure to get the geolocation of it
            const fetchedGeolocationData = await fetch(
              `https://ipgeolocation.abstractapi.com/v1/?api_key=f1b6c1943ccb4f2d887969d86367649d&ip_address=${ipAddress}`
            );
            const GeolocationResponse = await fetchedGeolocationData.json();
            resolve({
              latitude: GeolocationResponse.latitude,
              longitude: GeolocationResponse.longitude,
            });
          } catch (e) {
            //If neither the IP and location are provided then theres no other choice other than to default to an location (london)
            resolve({
              latitude: 51.5072,
              longitude: 0.1276,
            });
          }
        })
        .then((value) => {
          resolve(value);
        });
    });
  };
}

export default async function (
  weatherObjectConstructor,
  weatherIconHandeler,
  weatherIconObject,
  headerWrapper,
  moreWeatherInfoContainer,
  WMOdata,
  location,
  weatherSelect
) {
  if (!location) {
    const safeLocationHandeler = handleUserLocationError(getUserLocation);
    location = await safeLocationHandeler();
  }

  const weather = await weatherObjectConstructor(
    openMeteoWeather(location.latitude, location.longitude, WMOdata)
  );

  const images = weatherIconObject(
      "./day-cloudy.svg",
      "./cloud.svg",
      "./night-alt-cloudy.svg",
      "./night-clear.svg",
      "./day-sunny.svg",
      "./rain.svg",
      "./rain.svg",
      "./snow.svg",
      "./snow.svg",
      "./thunderstorm.svg",
      weather.getCurrentWeatherData().isDay,
    );

  headerWrapperInitilizer(
    headerWrapper,
    weather,
    weatherIconHandeler,
    images,
    WMOdata,
    await findCity(location.latitude, location.longitude)
  );

  const locationInfo = await findCity(location.latitude, location.longitude); 
  weatherSelect.addEventListener("change", async () => {
    if (moreWeatherInfoContainer.querySelector(".weather-info-wrapper")) {
      moreWeatherInfoContainer.removeChild(
        moreWeatherInfoContainer.querySelector(".weather-info-wrapper")
      );
    }

    await weatherInfoWrapper(
      moreWeatherInfoContainer,
      +weatherSelect.value,
      weather,
      locationInfo.country,
      locationInfo.city,
      images,
      weatherIconHandeler
    );

  })

  await weatherInfoWrapper(moreWeatherInfoContainer, 7, weather, locationInfo.country, locationInfo.city, images, weatherIconHandeler);

  countryCityWrapper(
    moreWeatherInfoContainer,
    locationInfo.citiesOnCountry,
    weatherObjectConstructor,
    WMOdata
  );

  const weekAvarageTemp = [];
  const thisWeekWeather = weather.getThisWeeksWeather();
  for(let prop in thisWeekWeather.data){
    weekAvarageTemp.push((thisWeekWeather.data[prop].minTemp + thisWeekWeather.data[prop].maxTemp) / 2);
  }

  plotDom(plot, weekAvarageTemp, moreWeatherInfoContainer);
}
