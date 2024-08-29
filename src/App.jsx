import Heading from "./component/Heading.jsx";
import React, { useState, useEffect, useRef } from "react";
import InfoPanel from './component/InfoPanel.jsx';
import "./index.css";
import FetchweatherUsingcity, { airIndex, Fetchforecast, WeatherUsingGeolocation } from "./api/Fetchweatherinfo";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [ForcastData, setForcastData] = useState('');
  const [AirIndex, setAirIndex] = useState('');
  const [cityName, setCityname] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasFetchedData = useRef(false);

  useEffect(() => {
    const getonload = async () => {
      if (hasFetchedData.current) return;
      hasFetchedData.current = true;

      setError(null);
      setIsLoading(true);

      try {
        const weatherdata = await WeatherUsingGeolocation() || await FetchweatherUsingcity('New Delhi');
        const forcastdata = weatherdata ? await Fetchforecast() : null;
        const airindexdata = weatherdata ? await airIndex() : null;

        setIsLoading(false);
        setCityname('New Delhi');
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

    getonload();
  }, []);

  return (
    <div className="grid gap-5 mx-1 p-2">
      <Heading
        cityName={cityName}
        setCityname={setCityname}
        error={error}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setError={setError}
        setWeatherData={setWeatherData}
        setForcastData={setForcastData}
        setAirIndex={setAirIndex}
      />
      <InfoPanel
        weatherData={weatherData}
        ForcastData={ForcastData}
        AirIndex={AirIndex}
      />
    </div>
  );
}
export default App;