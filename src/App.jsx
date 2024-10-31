import React, { useState, useEffect, useRef, useContext } from "react";
import Heading from "./component/Heading.jsx";
import "./index.css";
import { FetchweatherUsingGeolocation, airIndex, Fetchforecast } from "./api/Fetchweatherinfo";
import { weatherContext } from "./ContextApi/WeatherContext.jsx";
import InfoPanel from "./component/InfoPanel.jsx";

function App() {
  const { setWeatherData, setForcastData, setAirIndex, setCityname, } = useContext(weatherContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOnLoad = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const weatherdata = await FetchweatherUsingGeolocation();
        const forecastdata = weatherdata ? await Fetchforecast() : null;
        const airindexdata = weatherdata ? await airIndex() : null;

        setIsLoading(false);
        if (weatherdata && forecastdata && airindexdata) {
          setWeatherData(weatherdata);
          setForcastData(forecastdata);
          setAirIndex(airindexdata);
          setIsLoading(false);
          setCityname(weatherdata.name)

        } else {
          setError('Unable to fetch data.');
        }
      } catch (err) {
        setIsLoading(false);
        setError('An error occurred while fetching data.');
      }
    };

    getOnLoad();
  }, []);

  return (
    <div className="h-screen mt-3 p-3">
      <Heading
        error={error}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setError={setError}
      />
      <InfoPanel />
    </div>
  );
}

export default App;
