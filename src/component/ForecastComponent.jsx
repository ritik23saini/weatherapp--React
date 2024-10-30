import React from 'react';

const ForecastComponent = ({ ForcastData }) => {
  return (
    <div className=" bg-purple-200 lg:text-lg pb-1 rounded-2xl ">
      <div className='font-bold m-3 '>5 Day Forecast</div>
      <hr className="mx-4" />
      <div>
        {
          ForcastData.Forcast5days.map((data, index) => {
            // Convert timestamp to readable date and day
            const date = new Date(data.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

            return (
              <div key={index} className=" flex justify-around items-center md:grid m-3 p-2 bg-white rounded-lg shadow-lg text-lg md:text-base lg:text-xl ">
                <div>{day}, {formattedDate}</div>
                <div className=" flex md:items-centeritems-center">
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
