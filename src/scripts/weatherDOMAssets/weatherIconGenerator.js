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
  thunderstorm
) {
  const wmoCodeObject = {};

  for (let i = 1; i <= 99; i++) {
    if (i >= 1 && i <= 10) {
      wmoCodeObject[i] = partyCloudDayUrl;
    } else if (i >= 11 && i <= 20) {
      wmoCodeObject[i] = Cloudy;
    } else if (i >= 21 && i <= 30) {
      wmoCodeObject[i] = partyCloudNightUrl;
    } else if (i >= 31 && i <= 40) {
      wmoCodeObject[i] = ClearNightUrl;
    } else if (i >= 41 && i <= 50) {
      wmoCodeObject[i] = ClearDayUrl;
    } else if (i >= 51 && i <= 60) {
      wmoCodeObject[i] = RainyDayUrl;
    } else if (i >= 61 && i <= 70) {
      wmoCodeObject[i] = RainyNightUrl;
    } else if (i >= 71 && i <= 80) {
      wmoCodeObject[i] = SnowDayUrl;
    } else if (i >= 81 && i <= 90) {
      wmoCodeObject[i] = SnowNightUrl;
    } else {
      wmoCodeObject[i] = thunderstorm;
    }
  }

  return wmoCodeObject;
}
