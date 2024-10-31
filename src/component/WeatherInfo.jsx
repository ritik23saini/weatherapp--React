import React, { useContext } from 'react'
import { weatherContext } from '../ContextApi/WeatherContext'

const WeatherInfo = () => {
  const { weatherData } = useContext(weatherContext);

  return (

    <div className=" bg-purple-600 p-4 rounded-xl ">
      {weatherData && <div>
        <p>Now</p>
        <p>Weather in {weatherData.name}, {weatherData.sys.country}</p>

        <div className='flex'>
          <p className="font-bold">{Math.floor(weatherData.main.temp)}°C</p>
          <img alt="Weather icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
        </div>

        <p>Weather: {weatherData.weather[0].description}</p>
        <hr />
        <p>Humidity: {weatherData.main.humidity}%</p>
      </div>}

    </div>
  )

}

export default WeatherInfo