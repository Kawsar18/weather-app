const form = document.getElementById('form');
const input = document.getElementById('input');
const card = document.getElementById('card');
const cityDisplay = document.getElementById('cityDisplay');
const tempDisplay = document.getElementById('tempDisplay');
const humidityDisplay = document.getElementById('humidityDisplay');
const descDisplay = document.getElementById('descDisplay');
const emojiDisplay = document.getElementById('emojiDisplay');
const apiKey = '2d130f6d3a9f28998496c735d97f7838';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = await getData(input.value);
  console.log(data);

  const {
    name: city,
    main: { humidity, temp },
    weather: [{ description, id }],
  } = data;

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  emojiDisplay.textContent = getWeatherEmoji(id);
  card.style.display = 'flex';
});

async function getData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  console.log(response);

  if (!response.ok) {
    console.error('Could not fetch data');
  }
  return await response.json();
}

function getWeatherEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return '⛈️';
      break;
    case id >= 300 && id < 400:
      return '🌧️';
      break;
    case id >= 500 && id < 600:
      return '🌧️';
      break;
    case id >= 600 && id < 700:
      return '❄️';
      break;
    case id >= 700 && id < 800:
      return '🌫️';
      break;
    case id === 800:
      return '☀️';
      break;
    case id > 800:
      return '☁️';
  }
}
