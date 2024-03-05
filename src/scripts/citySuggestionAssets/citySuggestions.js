const cache = {};

//Takes an string name and returns an array of suggestions
export default async function (string, amount) {
  if(cache[string]){
    return cache[string];
  }

  const fetchedData = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${string}&apiKey=b97a9a3a451c44ec9ccc83a235e17c1f`,
    {
      mode: "cors",
    }
  );

  if (fetchedData.ok) {
    const jsonData = await fetchedData.json();

    const suggestions =  jsonData.features.reduce((acc, suggestion, index) => {
      if (suggestion.properties.city && index < amount) {
        acc.push({
          city: suggestion.properties.city,
          longitude: suggestion.properties.lon,
          latitute: suggestion.properties.lat,
          country: suggestion.properties.country,
        });
      }

      return acc;
    }, []);

    if(suggestions.length > 0)
      cache[string] = suggestions;

    return suggestions;
  }

  return [];
}
