let cache = sessionStorage.getItem("weatherCache")
  ? JSON.parse(sessionStorage.getItem("weatherCache"))
  : {};

function getFormatedDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

//Cache validity will be valid for 3 hours by default
export default async function (
  lat,
  long,
  WMOData,
  cacheValidityTimeDate
) {

  if(!cacheValidityTimeDate){
    cacheValidityTimeDate = new Date();
    cacheValidityTimeDate.setHours(cacheValidityTimeDate.getHours() + 3);
  }

  function getThisWeeksMondayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = (dayOfWeek + 6) % 7;
    const lastMonday = new Date(
      today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
    );

    return lastMonday;
  }

  function getThisWeeksSundayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilSunday = 7 - dayOfWeek;
    if (dayOfWeek === 0) {
      daysUntilSunday = 7;
    }
    const nextSunday = new Date(
      today.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000
    );

    return nextSunday;
  }

  const endOfWeekDate = getThisWeeksSundayDate();

  let foundCache = null;
  //Loop through the caches
  for (let prop in cache) {
    //Check if it has not expired and it maches this request
    const cachedDateTime = new Date(prop).getTime();
    const cacheValidtyTime = cacheValidityTimeDate.getTime(); 
    if (cachedDateTime < cacheValidtyTime && Math.round(cache[prop].latitude) === Math.round(lat) && Math.round(cache[prop].longitude) === Math.round(long)) {
      foundCache = cache[prop];
      break;
    }else if(cachedDateTime > cacheValidtyTime){
      delete cache[prop];
    }
  }

  if (foundCache) {
    console.log("Cache found");
    return weatherOnSuccess(foundCache, WMOData, lat, long);
  } else {
    console.log("No cache found making an request to the API");
    //Make an request to the server
    const request = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&start_date=${getFormatedDate(
        getThisWeeksMondayDate()
      )}&end_date=${getFormatedDate(endOfWeekDate)}`,
      {
        mode: "cors",
      }
    );

    if (request.ok) {
      const data = await request.json();
      if(!cache){
        cache = {};
      }

      const now = new Date();
      cache[now] = data;

      //OpenMeteo API will respond with an different Latitude and longitude so i had to change it to current.
      cache[now].latitude = lat;
      cache[now].longitude = long;

      sessionStorage.setItem("weatherCache", JSON.stringify(cache));
      return weatherOnSuccess(data, WMOData, lat, long);
    } else {
      throw new Error(request.status);
    }
  }
}

function weatherOnSuccess(data, WMOData, lat, long) {
  const getTodayWeekCode = () => new Date().getDay() - 1;

  function describeWeather(wmoCode) {
    if (data.current.is_day) {
      return WMOData[wmoCode].day.description;
    } else {
      return WMOData[wmoCode].night.description;
    }
  }

  function getCurrentWeatherData() {
    return {
      currentTemp: data.current.temperature_2m,
      isDay: data.current.is_day,
      date: getFormatedDate(new Date()),
      weatherCode: data.current.weather_code,
      description: describeWeather(data.current.weather_code),
      maxTemp: data.daily.temperature_2m_max[getTodayWeekCode()],
      minTemp: data.daily.temperature_2m_min[getTodayWeekCode()],
      sunrise: data.daily.sunrise[getTodayWeekCode()],
      sunset: data.daily.sunset[getTodayWeekCode()],
    };
  }

  //day is an number from 0-9
  function getDayOfWeekWeather(day) {
    if (day < 0 || day > 6) {
      throw new Error("Invalid day (must be from 0-6)");
    }
    return getCertainDayWeatherInDaily(day, data);
  }

  function getCertainDayWeatherInDaily(day, data) {
    return {
      minTemp: data.daily.temperature_2m_min[day],
      maxTemp: data.daily.temperature_2m_max[day],
      date: data.daily.time[day],
      weatherCode: data.daily.weather_code[day],
      sunrise: data.daily.sunrise[day],
      sunset: data.daily.sunset[day],
      description: describeWeather(data.daily.weather_code[day]),
    };
  }

  function getTodayWheather() {
    return getDayOfWeekWeather(getTodayWeekCode());
  }

  function getThisWeeksWeather() {
    return {
      data: {
        monday: getDayOfWeekWeather(0),
        tuesday: getDayOfWeekWeather(1),
        wensday: getDayOfWeekWeather(2),
        thursday: getDayOfWeekWeather(3),
        friday: getDayOfWeekWeather(4),
        saterday: getDayOfWeekWeather(5),
        sunday: getDayOfWeekWeather(6),
      },
    };
  }

  async function getWeatherDataOnDateFromNow(date) {
    const currentDate = new Date();
    const timeDiff = date.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff > 17) {
      throw new Error("This API only works with lower than 17 days.");
    }

    const request = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&start_date=${getFormatedDate(
        new Date()
      )}&end_date=${getFormatedDate(date)}`,
      {
        mode: "cors",
      }
    );

    const data = await request.json();
    const dataOnDate = [];

    data.daily.time.forEach((_, index) => {
      dataOnDate.push(getCertainDayWeatherInDaily(index, data));
    });

    return dataOnDate;
  }

  return {
    getCurrentWeatherData,
    getThisWeeksWeather,
    getTodayWheather,
    getWeatherDataOnDateFromNow,
  };
}
