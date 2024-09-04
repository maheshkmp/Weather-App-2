document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    const apiKey = '6e0940d21e2216269c0eedc6dedcd96b'; // Replace with your OpenWeatherMap API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            weatherResult.innerHTML = '<p>Please enter a city name.</p>';
            return;
        }

        fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    weatherResult.innerHTML = '<p>City not found.</p>';
                    return;
                }

                const temperature = data.main.temp;
                const weather = data.weather[0].description;
                const cityName = data.name;

                weatherResult.innerHTML = `
                    <h2>${cityName}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weather}</p>
                `;
            })
            .catch(error => {
                weatherResult.innerHTML = '<p>Unable to fetch weather data.</p>';
                console.error('Error fetching weather data:', error);
            });
    });
});
