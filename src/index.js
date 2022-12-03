import '/src/css/styles.css';

if (localStorage.system) {
  if (localStorage.system === 'f') {
    document.querySelector('.switch input').checked = true;
  } else {
    document.querySelector('.switch input').checked = false;
  }
} else {
  localStorage.setItem('system', 'c');
}

localStorage.setItem('lastLocation', 'San Francisco');

async function getWeatherForNow(location) {
  try {
    if (localStorage.system === 'f') {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a038982cb729018370e4114a70565f66&units=imperial`, { mode: 'cors' });
      const weatherDataToday = await response.json();
      const weatherToday = {
        'description': weatherDataToday.weather[0].description,
        'icon': weatherDataToday.weather[0].icon,
        'location': weatherDataToday.name,
        'feelsLike': `${weatherDataToday.main.feels_like} °F`,
        'humidity': `${weatherDataToday.main.humidity} %`,
        'pressure': `${weatherDataToday.main.pressure} hPa`,
        'temperature': `${weatherDataToday.main.temp} °F`,
        'visibility': `${weatherDataToday.visibility} meters`,
        'windSpeed': `${weatherDataToday.wind.speed} miles/hour`,
        'windDirection': `${weatherDataToday.wind.deg} deg`,
      };
      return weatherToday;
    } 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a038982cb729018370e4114a70565f66&units=metric`, { mode: 'cors' });
    const weatherDataToday = await response.json();
    const weatherToday = {
      'description': weatherDataToday.weather[0].description,
      'icon': weatherDataToday.weather[0].icon,
      'location': weatherDataToday.name,
      'feelsLike': `${weatherDataToday.main.feels_like} °C`,
      'humidity': `${weatherDataToday.main.humidity} %`,
      'pressure': `${weatherDataToday.main.pressure} hPa`,
      'temperature': `${weatherDataToday.main.temp} °C`,
      'visibility': `${weatherDataToday.visibility} meters`,
      'windSpeed': `${weatherDataToday.wind.speed} meter/sec`,
      'windDirection': `${weatherDataToday.wind.deg} deg`,
    };
    return weatherToday;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

function renderWeather(data) {
  const city = document.querySelector('.heading h1');
  const condition = document.querySelector('.heading h3');
  const img = document.querySelector('.imp img');
  const temp = document.querySelector('.imp h1');
  const feels = document.querySelector('p#feels span');
  const humidity = document.querySelector('p#humidity span');
  const windSpeed = document.querySelector('p#wind-speed span');
  const windDirection = document.querySelector('p#wind-direction span');
  const visibility = document.querySelector('p#visibility span');
  const pressure = document.querySelector('p#pressure span');

  city.textContent = data.location;
  condition.textContent = data.description;
  img.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  temp.textContent = data.temperature;
  feels.textContent = data.feelsLike;
  humidity.textContent = data.humidity;
  windSpeed.textContent = data.windSpeed;
  windDirection.textContent = data.windDirection;
  visibility.textContent = data.visibility;
  pressure.textContent = data.pressure;
}

const weatherSearch = (() => {
  async function search(location) {
    const data = await getWeatherForNow(location);
    renderWeather(data);
  }

  const input = document.querySelector('.search input');
  const button = document.querySelector('.search button');

  button.addEventListener('click', () => {
    search(input.value);
    localStorage.setItem('lastLocation', input.value);
  });
})();

document.querySelector('.switch input').addEventListener('change', async () => {
  if (document.querySelector('.switch input').checked) {
    localStorage.setItem('system', 'f');
  } else {
    localStorage.setItem('system', 'c');
  }
  const data = await getWeatherForNow(localStorage.lastLocation);
  renderWeather(data);
});
