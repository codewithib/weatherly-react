const WeatherDetails = ({ weather }) => {
    if (!weather) return <p>Loading...</p>;

    return (
        <div className="weather-details-card">
            <div className="right item">
                <p className="city-info">
                    {weather.city}, {weather.state}
                    <img src={weather.flagUrl} alt="Flag" className="flag" />
                </p>
                <p className="weather-condition">{weather.condition}</p>
                <p className="time">{weather.time}</p>
            </div>
            <div className="center-weather-icon item">
                <img src={weather.iconUrl} alt="Weather Icon" className="weather-icon" />
                <p className="temp">{weather.temp}°C</p>
            </div>
            <div className="extra-info">
                <p>Humidity: {weather.humidity}%</p>
                <p>Pressure: {weather.pressure}hPa</p>
                <p>Visibility: {weather.visibility}km</p>
            </div>
        </div>
    );
};

export default WeatherDetails;
