//Takes an string name and returns an array of suggestions
export default async function(string){
    const fetchedData = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${string}&apiKey=b97a9a3a451c44ec9ccc83a235e17c1f`,
      {
        mode: "cors"
      }
    );

    const jsonData = await fetchedData.json();

    const suggestionList = [];

    jsonData.features.forEach(suggestion => {
        if(suggestion.properties.city){
            suggestionList.push({
              city: suggestion.properties.city,
              longitute: suggestion.properties.lon,
              latitute: suggestion.properties.lat,
              country: suggestion.properties.country,
            });
        }
    });

    return suggestionList;
}