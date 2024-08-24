import React, { useState } from 'react';
import Fetchweatherinfo from "../api/Fetchweatherinfo.js";
import "../index.css";
import InfoPanel from './InfoPanel.jsx';
import WeatherInfo from './weatherInfo.jsx';

const Heading = ({ Country, setCountry, Cityname, setCityname }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!Cityname || !Country) {
      setError('Please select a country and enter a city name.');
      return;
    }

    setError(null);
    setIsLoading(true);
    const data = await Fetchweatherinfo(Cityname);
    setIsLoading(false);

    if (data) {
      setWeatherData(data);
    } else {
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <>
      <div className="flex justify-between gap-1 m-6 items-center">
        <h1 className=" text-white font-bold md:text-2xl">Weather App</h1>
        <div className="border-2 pe-3 rounded-2xl flex items-center">
          <input
            className="text-center text-black focus:outline-none rounded-l-2xl"
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
            value={Cityname}
            onChange={(event) => setCityname(event.target.value)}
          />
          <button
            className="text-black sm:w-14 sm:h-6 rounded-2xl ml-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
        <button
          className="ps-3 pe-3 bg-purple-600 text-center w-auto rounded-2xl"
          onClick={() => {
            initializeLocation();
          }}
        >
          Current location
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <InfoPanel weatherData={weatherData} />
    </>
  );
};

export default Heading;
