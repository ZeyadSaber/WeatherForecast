search();
async function search(city = "alexandria") {
  if (!city) city = "alexandria";
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9d2205694697446d9a0114156232402&q=${city}&days=3`
  );
  if (req.ok && 400 != req.status) {
    let list = await req.json();
    getWeather(list);
  }
}

document.querySelector("#location").addEventListener("input", function () {
  let location = document.getElementById("location").value;
  if (location.length > 2 || !location) search(location);
});

function getWeather(list) {
  let cartona = `
<div class="col-4">
<p class="text-center bg-info">${list.forecast.forecastday[0].date}</p>
<h2>${list.location.name}</h2>
<h1>${list.current.temp_c}°C</h1>
<img src="${list.current.condition.icon}" alt="">
<p>${list.current.condition.text}</p>
<p>chance of rain: <img src="${list.forecast.forecastday[0].day.condition.icon}">${list.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
<p>wind: ${list.current.wind_kph}km/h</p>
<p>wind direction: ${list.current.wind_dir}</p>
</div>
`;
  for (let i = 1; i < 3; i++) {
    cartona += `
  <div class="col-4 text-center">
<p class="text-center bg-info">${list.forecast.forecastday[i].date}</p>
<img src="${list.forecast.forecastday[i].day.condition.icon}" alt="">
<h3>max: ${list.forecast.forecastday[i].day.maxtemp_c}°C</h3>
<h4>min: ${list.forecast.forecastday[i].day.mintemp_c}°C</h4>
<p>${list.forecast.forecastday[i].day.condition.text}</p>
</div>
  `;
  }
  document.querySelector(".forecast").innerHTML = cartona;
}
