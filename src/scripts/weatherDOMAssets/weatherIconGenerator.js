//Will generate an object of WMO code corresponding to different urls {code: url}
export default function (
  partyCloudDayUrl,
  Cloudy,
  partyCloudNightUrl,
  ClearNightUrl,
  ClearDayUrl,
  RainyDayUrl,
  RainyNightUrl,
  SnowDayUrl,
  SnowNightUrl,
  thunderstorm,
  isDay
) {
  const wmoCodeObject = {};

  for (let i = 0; i <= 99; i++) {
    if(i == 0){
      wmoCodeObject[i] = ClearDayUrl;
    }
    else if (i >= 1 && i <= 10) {
      if(isDay) wmoCodeObject[i] = partyCloudDayUrl;
      else wmoCodeObject[i] = partyCloudNightUrl;
    } else if (i >= 11 && i <= 20) {
      wmoCodeObject[i] = Cloudy;
    } else if (i >= 21 && i <= 30) {
      if(isDay) wmoCodeObject[i] = partyCloudDayUrl;
      else wmoCodeObject[i] = partyCloudNightUrl;
    } else if (i >= 31 && i <= 40) {
      if(isDay) wmoCodeObject[i] = ClearDayUrl;
      else wmoCodeObject[i] = ClearNightUrl;
    } else if (i >= 41 && i <= 50) {
      if(isDay) wmoCodeObject[i] = ClearDayUrl;
      else wmoCodeObject[i] = ClearNightUrl;
    } else if (i >= 51 && i <= 60) {
      if(isDay) wmoCodeObject[i] = RainyDayUrl;
      else wmoCodeObject[i] = RainyNightUrl;
    } else if (i >= 61 && i <= 70) {
      if(isDay) wmoCodeObject[i] = RainyDayUrl;
      else wmoCodeObject[i] = RainyNightUrl;
    } else if (i >= 71 && i <= 80) {
      if(isDay) wmoCodeObject[i] = SnowDayUrl;
      else wmoCodeObject[i] = SnowNightUrl;
    } else if (i >= 81 && i <= 90) {
      if(isDay) wmoCodeObject[i] = SnowDayUrl; 
      else wmoCodeObject[i] = SnowNightUrl;
    } else {
      wmoCodeObject[i] = thunderstorm;
    }
  }

  return wmoCodeObject;
}
