const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "18d3523ca5ae630ca76ac4f5fc2d0b1c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                locationNotFound.style.display = "flex";
                weatherBody.style.display = "none";
                return;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const weatherData = await response.json();
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        // Temperature in Celsius
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

        // Weather Description
        description.innerHTML = `${weatherData.weather[0].description}`;

        // Humidity and Wind Speed
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        // Weather Icon
        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "https://png.pngtree.com/png-clipart/20230823/original/pngtree-partial-cloudy-daytime-weather-sun-picture-image_8201451.png";
                break;
            case 'Clear':
                weatherImg.src = "https://cdn0.iconfinder.com/data/icons/weather-forecast-17/128/forecast-weather_sun-clear-hot-512.png";
                break;
            case 'Rain':
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/4235/4235322.png";
                break;
            case 'Mist':
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
                break;
            case 'Snow':
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/6221/6221304.png";
                break;
            default:
                weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Default icon
                break;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data. Please try again.");
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
