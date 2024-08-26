import { useState } from "react";
import React from 'react';
import FetchweatherUsingcity,{ Fetchforecast, airIndex } from "../api/Fetchweatherinfo.js";

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
        const forcastdata = weatherdata ? await Fetchforecast(weatherdata) : null;
        const airindexdata = weatherdata ? await airIndex() : null;

        setIsLoading(false);

        if (weatherdata && forcastdata && airIndex) {
            setWeatherData(weatherdata);
            setForcastData(forcastdata);
            setAirIndex(airindexdata);
        }
        else {
            setError('Unable to fetch data.');
        }

    };

    return (
        <button
            className="text-black sm:w-14 sm:h-6 rounded-2xl ml-2"
            onClick={handleSearch}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Search'}
        </button>
    );
};

export default SearchButton;