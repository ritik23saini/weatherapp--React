import Heading from "./component/Heading.jsx";
import React, { useState, useEffect, useRef } from "react";
import ForecastComponent from './component/ForecastComponent';
import WeatherInfo from './component/WeatherInfo';
import Highlights from './component/Highlights';
import HourlyUpdate from './component/HourlyUpdate';
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
    return () => {
      //clean up needed 
    }
  }, []);

  return (
    <div className=" h-screen mt-3 p-3">
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
      {/* Info Panel */}
      {weatherData && (
        <div className=' max-h-fit mt-3 py-1 md:grid md:grid-cols-6 gap-1'>
          <div className=" m-4 md:col-span-2 xl:col-span-1">
            <WeatherInfo weatherData={weatherData} />
            <ForecastComponent ForcastData={ForcastData} />
          </div>
          <div className=" m-4 md:col-span-4 xl:col-span-5 ">
            <Highlights weatherData={weatherData} AirIndex={AirIndex} />
            <HourlyUpdate ForcastData={ForcastData} />

          </div>
        </div>

      )}
    </div>
  );
}
export default App;