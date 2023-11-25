const apiKey = '786a0f586220cc50e0c40f945737b4e0'; // Replace with your API key

function getWeather() {
  const city = document.getElementById('cityInput').value;

  // Fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => console.error('Error fetching current weather:', error));

  // Fetch forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayWeatherForecast(data);
    })
    .catch(error => console.error('Error fetching weather forecast:', error));
}

function displayCurrentWeather(data) {
  const currentWeatherCardContainer = document.getElementById('currentWeatherCardContainer');
  currentWeatherCardContainer.innerHTML = '';

  const iconClass = `wi wi-owm-${data.weather[0].id} wi-3d`;
  const cardHtml = `
    <div class="weather-card">
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>${data.weather[0].main}</p>
      <i class="${iconClass}"></i>
      <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    </div>
  `;

  currentWeatherCardContainer.innerHTML = cardHtml;
}

function displayWeatherForecast(data) {
  const forecastCardsContainer = document.getElementById('forecastCardsContainer');
  forecastCardsContainer.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const forecast = data.list[i * 8]; // Displaying every 8th record for simplicity
    const iconClass = `wi wi-owm-${forecast.weather[0].id} wi-3d`;

    const cardHtml = `
      <div class="col-md-2">
        <div class="weather-card">
          <p>${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
          <i class="${iconClass}"></i>
          <p>${Math.round(forecast.main.temp - 273.15)}°C</p>
        </div>
      </div>
    `;

    forecastCardsContainer.innerHTML += cardHtml;
  }
}
