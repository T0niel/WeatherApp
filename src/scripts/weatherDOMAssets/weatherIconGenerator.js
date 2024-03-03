export default function generateWMOCodeObject(
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

  const assignURL = (start, end, url) => {
    for (let i = start; i <= end; i++) {
      wmoCodeObject[i] = url;
    }
  };

  if (isDay) {
    wmoCodeObject[0] = ClearDayUrl;
    assignURL(1, 10, partyCloudDayUrl);
    assignURL(21, 30, partyCloudDayUrl);
    assignURL(31, 50, ClearDayUrl);
    assignURL(51, 70, RainyDayUrl);
    assignURL(71, 90, SnowDayUrl);
  } else {
    wmoCodeObject[0] = ClearNightUrl;
    assignURL(1, 10, partyCloudNightUrl);
    assignURL(21, 30, partyCloudNightUrl);
    assignURL(31, 50, ClearNightUrl);
    assignURL(51, 70, RainyNightUrl);
    assignURL(71, 90, SnowNightUrl);
  }

  wmoCodeObject[11] = wmoCodeObject[20] = wmoCodeObject[40] = thunderstorm;
  wmoCodeObject[20] = Cloudy;

  return wmoCodeObject;
}
