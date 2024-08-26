import { useState } from "react";
import React from 'react';
import "../index.css";
import SearchButton from './SearchButton.jsx';

const Heading = ({ setWeatherData, ForcastData, setForcastData, setAirIndex, AirIndex }) => {
  const [cityName, setCityname] = useState('');
  const [error, setError] = useState(null);


  return (
    <>
      <div className="flex justify-between gap-1 m-6 items-center">
        <a href="/" className=" text-white font-bold md:text-2xl">Weather App</a>
        <div className="border-2 pe-3 rounded-2xl flex items-center">
          <input
            className="text-center text-black focus:outline-none rounded-l-2xl"
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
            value={cityName}
            onChange={(event) => setCityname(event.target.value)}
          />
          <SearchButton
            cityName={cityName}
            setWeatherData={setWeatherData}
            setError={setError}
            ForcastData={ForcastData}
            setForcastData={setForcastData}
            AirIndex={AirIndex}
            setAirIndex={setAirIndex}
          />

        </div>
        <button className="ps-3 pe-3 bg-purple-600 text-center w-auto rounded-2xl"
          onClick={() => {
            getCurrentGeolocation();
          }}>Current location</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}



    </>
  );
};

export default Heading;
