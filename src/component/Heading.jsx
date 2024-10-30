import React, { useState } from 'react';
import search from "../assets/search.svg";
import FetchweatherUsingcity, { WeatherUsingGeolocation, airIndex, Fetchforecast } from "../api/Fetchweatherinfo";

const Heading = ({ cityName, setIsLoading, isLoading, setCityname, error, setError, setWeatherData, setForcastData, setAirIndex }) => {


  const handleSearch = async () => {
    if (cityName === '') {
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
      <div className="flex justify-between p-1 items-center" >
        <a href="/" className="text-white text-3xl font-bold">Weather App</a>
        <div className="flex justify-center rounded-lg bg-white items-center px-3">
          <input
            className="text-center outline-none"
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
            value={cityName}
            onChange={(event) => setCityname(event.target.value)}
          />
          <button
            className="text-black rounded-lg px-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...'/* <Skeleton/> */ : <img className='w-5' src={search} alt="search" />}
          </button>
        </div>
        <button
          className="bg-purple-600 px-2 rounded-lg"
          onClick={WeatherUsingGeolocation}
        >
          Get location
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Heading;
