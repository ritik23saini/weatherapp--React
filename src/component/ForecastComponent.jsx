import React, { useContext } from 'react'
import { weatherContext } from "../ContextApi/WeatherContext.jsx";

const ForecastComponent = () => {
  const { ForcastData } = useContext(weatherContext);

  return (
    <div className=" bg-purple-200 lg:text-lg pb-1 rounded-2xl ">
      <div className='font-bold m-4 '>5 Day Forecast</div>
      <hr className="mx-4" />
      <div className='p-1'>
        {
          ForcastData?.Forcast5days?.map((data, index) => {
            // Convert timestamp to readable date and day
            const date = new Date(data.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

            return (
              <div key={index} className="justify-around items-center m-3 p-2 bg-white rounded-lg shadow-lg  ">
                <div>{day}, {formattedDate}</div>
                <div className=" flex md:items-center items-center">
                  <div className=" font-bold">{data.main.temp}°C</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt={data.weather[0].description}
                    className="ml-4"
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ForecastComponent;
