const inputBox = document.querySelector('.input-box');
const searchImg = document.querySelector('.search-img');
const weather_img = document.querySelector('.weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humdity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

function checkWeather(city){
    const api_key = "e57a7d409dd1a536f20d139d8ec78876";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    console.log(weather_data);
}

searchImg.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});