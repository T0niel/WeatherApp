the Weather.js expects an object (API) that implements these methods (openMeteoWeather is just an implementation):

getCurrentWeatherData() Which gives you the current weather.
```
getCurrentWeatherData() : OBJECT,
    Example: {
            currentTemp: number,
            isDay: number (1 to 0),
            date: string,
            weatherCode: number (WMO code),
            description: description,
            maxTemp: maxTemp,
            minTemp: minTemp,
            sunrise: string,
            sunset: string,
        }
```

getThisWeeksWeather() Which gives you this weeks weather (from monday to sunday).

```
getThisWeeksWeather() : OBJECT,
    Example: {
          monday: {
            minTemp: number,
            maxTemp: number,
            date: string,
            weatherCode: number,
            sunrise: number,
            sunset: number,
            description: string,
          },
          tuesday: ...,
          wensday: ...,
          thursday: ...,
          friday: ...,
          saterday: ...,
          sunday: ...,
        }
```

getTodayWheather() Which gives you today weather

```
getTodayWheather() : OBJECT,
    Example: {
        minTemp: number,
        maxTemp: number,
        date: string,
        weatherCode: number,
        sunrise: number,
        sunset: number,
        description: string,
    }    
```

getWeatherDataOnDateFromNow() Which takes an date and gives you the weather info from the current date to that date.

```
ASYNC getWeatherDataOnDateFromNow() : ARRAY,
    Example: [
        0: {
            minTemp: number,
            maxTemp: number,
            date: string,
            weatherCode: number,
            sunrise: number,
            sunset: number,
            description: string
        }
        ...
    ]
```

NOTE: it expects the tempature by the API to be in celsius