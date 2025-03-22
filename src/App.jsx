import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import Footer from "./components/Footer";

const App = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const fetchWeather = async (event, city = "London") => {
        if (event) event.preventDefault();
        if (!city) return alert("Please enter a city name");

        try {
            const apiKey = "3ab0ef60b213e9508103da95332076de";
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) throw new Error("City not found");

            const weatherData = await weatherResponse.json();
            const countryCode = weatherData.sys.country;
            const flagUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
            const state = geoData[0]?.state || "Unknown State";

            setWeather({
                city: weatherData.name,
                state,
                flagUrl,
                iconUrl: weatherIconUrl,
                temp: weatherData.main.temp,
                condition: weatherData.weather[0].description,
                time: new Date(weatherData.dt * 1000).toLocaleTimeString(),
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                visibility: (weatherData.visibility / 1000).toFixed(1),
            });

            // Fetch forecast
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error("Unable to get forecast");

            const forecastData = await forecastResponse.json();
            const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

            setForecast(dailyForecasts.map(day => ({
                date: new Date(day.dt * 1000).toDateString(),
                iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                condition: day.weather[0].description,
                temp: day.main.temp,
            })));

        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchWeather(null, "London"); // Load default city on mount
    }, []);

    return (
        <div className="container">
            <h1 className="logo-text">Weatherly</h1>
            <SearchBar handleSearch={fetchWeather} />
            {weather && <WeatherDetails weather={weather} />}
            <Footer />
        </div>
    );
};

export default App;
