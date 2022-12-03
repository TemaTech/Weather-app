import '/src/css/styles.css';

const currentMode = 'f';

async function getWeather(location) {
  try {
    if (currentMode === 'f') {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a038982cb729018370e4114a70565f66&units=imperial`, { mode: 'cors' });
      const weatherDataToday = await response.json();
      const weatherToday = {
        description: weatherDataToday.weather[0].description,
        icon: weatherDataToday.weather[0].icon,
        location: weatherDataToday.name,
        'feels-like': `${weatherDataToday.main.feels_like} °F`,
        humidity: `${weatherDataToday.main.humidity} %`,
        pressure: `${weatherDataToday.main.pressure} hPa`,
        temperature: `${weatherDataToday.main.temp} °F`,
        visibility: `${weatherDataToday.visibility} meters`,
        'wind-speed': `${weatherDataToday.wind.speed} miles/hour`,
        'wind-direction': `${weatherDataToday.wind.deg} °`,
      };
      return weatherToday;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a038982cb729018370e4114a70565f66&units=metric`, { mode: 'cors' });
    const weatherDataToday = await response.json();
    const weatherToday = {
      description: weatherDataToday.weather[0].description,
      icon: weatherDataToday.weather[0].icon,
      location: weatherDataToday.name,
      'feels-like': `${weatherDataToday.main.feels_like} °C`,
      humidity: `${weatherDataToday.main.humidity} %`,
      pressure: `${weatherDataToday.main.pressure} hPa`,
      temperature: `${weatherDataToday.main.temp} °C`,
      visibility: `${weatherDataToday.visibility} meters`,
      'wind-speed': `${weatherDataToday.wind.speed} meter/sec`,
      'wind-direction': `${weatherDataToday.wind.deg} °`,
    };
    return weatherToday;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const weatherSearch = (() => {

  async function search(location) {
    const data = await getWeather(location);
    console.log(data);
  }

  const input = document.querySelector('.search input');
  const button = document.querySelector('.search button');

  button.addEventListener('click', () => {
    search(input.value);
  });

})();

