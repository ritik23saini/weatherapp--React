const API_key = "0ee78a69ea7e7dca9ae21eefe15eabe2";
let lat = '';
let lon = '';

// Function to fetch weather data using city name
const FetchweatherUsingcity = async (cityname) => {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Status: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Current Weather Data:', data);
    lat = data.coord.lat;
    lon = data.coord.lon;
    Fetchforecast();
    return data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

// Function to fetch the weather forecast based on latitude and longitude
export const Fetchforecast = async () => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const forecast = await response.json(); 
    const top5Temperatures = await forecast.list
      .map(item => item) // Extract temperatures
      .sort((a, b) => b - a)       // Sort descending
      .slice(1, 6);                // Get top 5

    console.log('Top 5 Temperatures:', forecast);
    return top5Temperatures;

  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }

};

/* export const WeatherUsingGeoloaction = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`Accuracy: ${crd.accuracy} meters.`);

    fetchCurrentgeolocation(crd);
  }

  function error(err) {
    let errorMessage = 'An unknown error occurred.';
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = 'User denied the request for Geolocation.';
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable.';
        break;
      case err.TIMEOUT:
        errorMessage = 'The request to get user location timed out.';
        break;
    }
    console.warn(`ERROR(${err.code}): ${errorMessage}`);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

// Function to fetch the reverse geolocation data (city, country) based on latitude and longitude
const fetchCurrentgeolocation = async () => {
  const reversegeocoding_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${API_key}`;

  try {
    const response = await fetch(reversegeocoding_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Reverse Geocoding Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return null;
  }
} */



export const airIndex = async () => {
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const airIndex = await response.json();
    console.log('Air Index:', airIndex);
    return airIndex;
  }
  catch (error) {
    console.error('Error fetching air quality data:', error);
  }


}
export default FetchweatherUsingcity;
