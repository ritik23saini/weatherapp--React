const API_key = "0ee78a69ea7e7dca9ae21eefe15eabe2";
let lat = '';
let lon = '';

// Function to fetch weather data using city name
export const FetchweatherUsingcity = async (cityname) => {
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
    return data;
  } catch (error) {
    console.log('Error fetching weather data:', error);
    return null;
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

    const data = await response.json();
    const Hourlyforecast = await data.list.slice(2, 7);

    const Forcast5days = await filter5days(data);

    const forecast = {
      Forcast5days,
      Hourlyforecast
    };

    console.log(forecast)
    return forecast;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

// Function to filter 5-day forecast data
export const filter5days = async (forecast) => {
  const targetTime = "03:00:00"; // The specific time you want to match
  const today = new Date(); // Current date

  // Function to add days to the current date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Filter the data to get entries with the target time for the next 5 days
  const forcast5day = forecast.list.filter(entry => {
    const entryDate = new Date(entry.dt_txt);
    const entryTime = entry.dt_txt.split(" ")[1];
    return entryTime === targetTime && entryDate > today && entryDate <= addDays(today, 5);
  });

  return forcast5day;
};

// Function to fetch air quality index
export const airIndex = async () => {
  if (!lat || !lon) {
    console.error('Latitude and Longitude are required to fetch air index.');
    return null;
  }

  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const airIndex = await response.json();
    console.log('Air Index:', airIndex);
    return airIndex;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};

export default FetchweatherUsingcity;

/* Uncomment and use this function to fetch weather using geolocation
export const WeatherUsingGeolocation = () => {
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

        lat = crd.latitude;
        lon = crd.longitude;

        fetchCurrentGeolocation();
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
};

// Function to fetch reverse geolocation data (city, country) based on latitude and longitude
const fetchCurrentGeolocation = async () => {
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
};
*/
