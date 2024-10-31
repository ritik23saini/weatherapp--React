import React, { useContext } from 'react';
import search from "../assets/search.svg";
import { FetchweatherUsingcity, FetchweatherUsingGeolocation, airIndex, Fetchforecast } from "../api/Fetchweatherinfo";
import { weatherContext } from '../ContextApi/WeatherContext';

const Heading = ({ setIsLoading, isLoading, error, setError }) => {

  const { setWeatherData, setForcastData, setAirIndex, cityName, setCityname } = useContext(weatherContext);

  const getCurrentPosition = async () => {

    setIsLoading(true);
    try {
      const weatherdata = await FetchweatherUsingGeolocation();
      const forcastdata = weatherdata ? await Fetchforecast() : null;
      const airindexdata = weatherdata ? await airIndex() : null;

      setIsLoading(false);

      if (weatherdata && forcastdata && airindexdata) {
        setWeatherData(weatherdata);
        setForcastData(forcastdata);
        setAirIndex(airindexdata);
        setCityname(weatherdata.name)

      }
      else {
        setError('Unable to fetch data.');
        return;
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while fetching data.');
    }
  }


  const handleSearch = async () => {
    if (cityName === '') {
      setError('Please enter a valid city');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const weatherdata = await FetchweatherUsingcity(cityName);
      const forcastdata = weatherdata ? await Fetchforecast() : null;
      const airindexdata = weatherdata ? await airIndex() : null;

      setIsLoading(false);

      if (weatherdata && forcastdata && airindexdata) {
        setWeatherData(weatherdata);
        setForcastData(forcastdata);
        setAirIndex(airindexdata);

      }
      else {
        setError('Unable to fetch data.');
        return;
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <>
      <div className="inline-grid gap-2 sm:flex sm:justify-between sm:p-1 sm:items-center" >
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
            {isLoading ? 'Loading...' : <img className='w-5' src={search} alt="search" />}
          </button>
        </div>
        <button
          className="bg-purple-600 px-3 rounded-xl"
          onClick={getCurrentPosition}
        >
         Get Current Weather
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Heading;
