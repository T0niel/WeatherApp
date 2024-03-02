export default async function (API) {
    const APIData = await API;

    async function getWeatherDataFromDays(days){
        if(typeof days !== 'number'){
            throw new Error("Please provide an number");
        }
        const curr = new Date();
        curr.setDate(days);
        const data = await APIData.getWeatherDataOnDateFromNow(curr);
        return data;
    }

    return {
      getThisWeeksWeather: APIData.getThisWeeksWeather,
      getTodayWheather: APIData.getTodayWheather,
      getCurrentWeatherData: APIData.getCurrentWeatherData,
      getWeatherDataFromDays,
    };
}
