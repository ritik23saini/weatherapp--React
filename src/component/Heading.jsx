import React, { useState } from 'react';
import search from "../assets/search.svg";
import FetchweatherUsingcity, { WeatherUsingGeolocation,airIndex, Fetchforecast } from "../api/Fetchweatherinfo";

const Heading = ({ cityName, setIsLoading,isLoading,setCityname, error, setError, setWeatherData, setForcastData, setAirIndex }) => {
  

  const handleSearch = async () => {
    if (cityName=== '') {
      setError('Please enter a valid city');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const weatherdata = await FetchweatherUsingcity(cityName) || null;
      const forcastdata = weatherdata ? await Fetchforecast() : null;
      const airindexdata = weatherdata ? await airIndex() : null;

      setIsLoading(false);

      if (weatherdata && forcastdata && airindexdata) {
        setWeatherData(weatherdata);
        setForcastData(forcastdata);
        setAirIndex(airindexdata);
      } else {
        setError('Unable to fetch data.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <a href="/" className="text-white font-bold">Weather App</a>
        <div className="border-2 rounded-2xl flex items-center">
          <input
            className="text-center text-black focus:outline-none rounded-l-2xl"
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
            value={cityName}
            onChange={(event) => setCityname(event.target.value)}
          />
          <button
            className="text-black rounded-2xl px-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : <img className='w-5' src={search} alt="search" />}
          </button>
        </div>
        <button
          className="bg-purple-600 text-center rounded-2xl"
          onClick={WeatherUsingGeolocation}
        >
          Current location
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Heading;
