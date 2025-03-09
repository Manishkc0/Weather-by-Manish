const apiKey = "e57a7d409dd1a536f20d139d8ec78876";

const cityInput = document.querySelector(".input-box");
const searchButton = document.querySelector("button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const descriptionElement = document.querySelector(".description");
const humidityElement = document.querySelector(".humidity span");
const windSpeedElement = document.querySelector(".wind span");
const imageElement = document.querySelector(".update-img img");
const dateElement = document.querySelector(".date");
const timeElement = document.querySelector(".time");

// Function to format the current date
function getCurrentDate() {
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return now.toLocaleDateString('en-US', options);
}

// Function to update the real-time clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Start the real-time clock
setInterval(updateClock, 1000);

// Function to fetch weather data
function fetchWeatherData() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { description } = data.weather[0];
      const weatherCondition = data.weather[0].main;

      cityElement.textContent = name;
      tempElement.textContent = `${Math.round(temp)}°C`;
      descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      humidityElement.textContent = `${humidity}%`;
      windSpeedElement.textContent = `${speed} km/h`;

      // Update weather icon based on the weather condition
      switch (weatherCondition) {
        case 'Clear':
          imageElement.src = 'image/weather/clear.svg';
          break;
        case 'Rain':
          imageElement.src = 'image/weather/rain.svg';
          break;
        default:
          imageElement.src = 'image/weather/atmosphere.svg';
      }

      // Update the date to the current date
      dateElement.textContent = getCurrentDate();
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again.");
    });
}

searchButton.addEventListener("click", fetchWeatherData);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    fetchWeatherData(); 
  }
});
