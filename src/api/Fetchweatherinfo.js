const API_key = "0ee78a69ea7e7dca9ae21eefe15eabe2";
let lat = '', lon = '';
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
    console.log('Data Fetch success');
    return data;
  }

  catch (error) {
    alert('Error fetching weather data:', error);
    console.warn('Error fetching weather data:', error);
    return null;
  }
};

export const FetchweatherUsingGeolocation = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    const { latitude, longitude } = position.coords;

    if (latitude && longitude) {
      lat = latitude;
      lon = longitude;
    }
    const reverseGeocoding = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`);
    const data = await reverseGeocoding.json();
    console.log(data)
    return data;

  } catch (err) {
    if (err.code === err.PERMISSION_DENIED) {
      alert('Location access denied. Please enable location permissions.');
    } else if (err.code === err.POSITION_UNAVAILABLE) {
      alert('Location unavailable. Please check your network or GPS.');
    } else if (err.code === err.TIMEOUT) {
      alert('Location request timed out. Please try again.');
    } else {
      alert('An unknown error occurred while fetching location.');
    }
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
    const Hourlyforecast = data.list.slice(2, 7);

    const Forcast5days = filter5days(data);

    const forecast = {
      Forcast5days,
      Hourlyforecast,
    };

    return forecast;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

// Function to filter 5-day forecast data
export const filter5days = (forecast) => {
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

  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const airIndex = await response.json();
    /* console.log('Air Index:', airIndex); */
    return airIndex;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};
