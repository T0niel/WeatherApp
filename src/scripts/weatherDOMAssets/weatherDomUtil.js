import openMeteoWeather from "../weatherAssets/openMeteoWeather.mjs";

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
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
              longitute: GeolocationResponse.longitude,
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
  weatherCardContainer,
  searchInput,
  WMOdata
) {
  const safeLocationHandeler = handleUserLocationError(getUserLocation);
  const location = await safeLocationHandeler();

  const weather = weatherObjectConstructor(openMeteoWeather(location.latitude, location.longitude, WMOdata));
  

}
