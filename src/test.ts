fetch("https://pokeapi.co/api/v2/location-area/pastoria-city-area")
  .then(res => console.log(res.status))
  .catch(err => console.log("Error:", err));