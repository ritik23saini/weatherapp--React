import { useState } from "react";
import React from 'react';
import FetchweatherUsingcity, { Fetchforecast, airIndex } from "../api/Fetchweatherinfo.js";
import search from "../assets/search.svg";

const SearchButton = ({ cityName, setWeatherData, setError, setForcastData, setAirIndex }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!cityName) {
            setError('Please enter a city name.');
            return;
        }

        setError(null);
        setIsLoading(true);

        const weatherdata = await FetchweatherUsingcity(cityName);
        const forcastdata = weatherdata ? await Fetchforecast() : null;
        const airindexdata = weatherdata ? await airIndex() : null;

        setIsLoading(false);

        if (weatherdata && forcastdata && airIndex) {
            setWeatherData(weatherdata);
            setForcastData(forcastdata);
            setAirIndex(airindexdata);
            console.log(forcastdata)
        }
        else {
            setError('Unable to fetch data.');
        }

    };

    return (
        
            <button
                className="text-black rounded-2xl  px-2"
                onClick={handleSearch}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : <img className=' w-5'src={search}></img>}
            </button>

       
    );
};

export default SearchButton;