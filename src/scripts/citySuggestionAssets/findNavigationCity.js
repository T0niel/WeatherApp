export default async function(city, suggestionAmount){
    const fetchData = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${suggestionAmount}&language=en&format=json`
    );
    const fetchedData = await fetchData.json();

    const cityData = [];

    fetchedData.results.forEach(item => {
        cityData.push({
          latitute: item.latitude,
          longitude: item.longitude,
        });
    });;

    return cityData;
}