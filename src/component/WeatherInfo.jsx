import React from 'react'

const WeatherInfo = ({weatherData}) => {
  return (
    <div className=" bg-purple-600 m-5 p-4 rounded-xl sm:text-lg">
                    <p>Now</p>
                    <p>Weather in {weatherData.name}</p>
                    
                    <div className='flex'>
                        <p className="font-bold">{Math.floor(weatherData.main.temp)}°C</p>
                        <img alt="Weather icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
                    </div>

                    <p>Weather: {weatherData.weather[0].description}</p>
                    <hr />
                    <p>Humidity: {weatherData.main.humidity}%</p>

                </div>
  )
}

export default WeatherInfo