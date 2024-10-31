import React, { useState, createContext } from 'react';
export const weatherContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [ForcastData, setForcastData] = useState(null);
  const [AirIndex, setAirIndex] = useState('');
  const [cityName, setCityname] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <weatherContext.Provider value={{ weatherData, setWeatherData, ForcastData, setForcastData, AirIndex, setAirIndex, cityName, setCityname ,error, setError,isLoading, setIsLoading}}>
      {children}
    </weatherContext.Provider>
  );
};
