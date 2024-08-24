import { useEffect, useState } from "react";
import fetchCurrentgeolocation from "./api/fetchCurrentgeolocation.js";
import Heading from "./component/Heading.jsx";
import "./index.css"

function App() {
  const [cityName, setCityname] = useState('');
  const [country, setCountry] = useState('India');
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeLocation = async () => {

      /*const coords = await fetchCurrentgeolocation();
      console.log("Coordinates fetched:", coords);

      // Example of fetching city and country based on coordinates
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`);
      const data = await response.json(); */
    }

    initializeLocation();
  }, []);

  return (
    <>
      <div>
        <Heading
          Country={country}
          Cityname={cityName}
          setCityname={setCityname}
          setCountry={setCountry}
        />
      </div>
    </>
  );
}

export default App;
