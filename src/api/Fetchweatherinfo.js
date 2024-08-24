const Fetchweatherinfo = async (cityname) => {
  const API_key = "0ee78a69ea7e7dca9ae21eefe15eabe2";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${API_key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default Fetchweatherinfo;
