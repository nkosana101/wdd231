
const API_KEY = "5e223612200590afe290c55a90c9e9a3";

// Benoni coordinates
const LATITUDE = -26.1885;
const LONGITUDE = 28.3208;

const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#forecast");

// Display date in a readable format
function formatDate(date) {
    return date.toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "short"
    });
}

// Get weather information
async function getWeather() {
    try {
        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

        // Fetch both weather requests
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather information could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        currentWeather.textContent =
            "Weather information is currently unavailable.";

        weatherForecast.textContent =
            "Forecast information is currently unavailable.";
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentWeather.innerHTML = `
        <div class="current-weather-card">
            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >
            <h3>Benoni, South Africa</h3>
            <p class="temperature">${temperature}&deg;C</p>
            <p>${description}</p>
            <p>Feels like ${Math.round(data.main.feels_like)}&deg;C</p>
        </div>
    `;
}

// Display three-day forecast
function displayForecast(data) {
    const timezoneOffset = data.city.timezone;

    const dailyForecasts = {};

    data.list.forEach(item => {
        // Convert forecast time to Benoni local time
        const localDate = new Date(
            (item.dt + timezoneOffset) * 1000
        );

        const dateKey = localDate.toISOString().split("T")[0];

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = {
                date: localDate,
                min: item.main.temp_min,
                max: item.main.temp_max,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            };
        } else {
            dailyForecasts[dateKey].min = Math.min(
                dailyForecasts[dateKey].min,
                item.main.temp_min
            );

            dailyForecasts[dateKey].max = Math.max(
                dailyForecasts[dateKey].max,
                item.main.temp_max
            );

            // Prefer a forecast close to midday
            if (localDate.getUTCHours() === 12) {
                dailyForecasts[dateKey].description =
                    item.weather[0].description;

                dailyForecasts[dateKey].icon =
                    item.weather[0].icon;
            }
        }
    });

    // Exclude today and select the next three days
    const today = new Date(
        (data.list[0].dt + timezoneOffset) * 1000
    ).toISOString().split("T")[0];

    const nextThreeDays = Object.entries(dailyForecasts)
        .filter(([date]) => date > today)
        .slice(0, 3);

    weatherForecast.innerHTML = nextThreeDays.map(([date, weather]) => `
        <article class="forecast-card">
            <h4>${formatDate(weather.date)}</h4>

            <img
                src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
                alt="${weather.description}"
            >

            <p>${weather.description}</p>

            <p>
                High: ${Math.round(weather.max)}&deg;C
            </p>

            <p>
                Low: ${Math.round(weather.min)}&deg;C
            </p>
        </article>
    `).join("");
}

// Start weather application
getWeather();
