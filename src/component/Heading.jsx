import React, { useContext, useRef } from 'react';
import search from "../assets/search.svg";
import { FetchweatherUsingcity, FetchweatherUsingGeolocation, airIndex, Fetchforecast } from "../api/Fetchweatherinfo";
import { weatherContext } from '../ContextApi/WeatherContext';

const Heading = () => {

  const { setWeatherData, setForcastData, setAirIndex, cityName, setCityname ,error, setError,isLoading, setIsLoading} = useContext(weatherContext);

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
  const inputRef = useRef(null);

  const handleDivClick = () => {
    inputRef.current.focus();
  };
  return (
    <>
      <div className=" m-5 gap-2 sm:flex justify-between sm:p-1 items-baseline" >
        <a href="/" className="text-white text-3xl font-bold  text-center block"> Weather App</a>
        <div onClick={handleDivClick} className=" flex justify-center rounded-lg bg-white items-center px-3">
          <input
            className="text-center outline-none"
            type="text"
            id="city"
            name="city"
            ref={inputRef}
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

        <div className=" flex justify-center mt-1  ">
          <button className='bg-purple-700 rounded-xl hover:bg-slate-400 px-10' onClick={getCurrentPosition}>Get Current Weather</button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Heading;
