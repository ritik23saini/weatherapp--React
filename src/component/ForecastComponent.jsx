import React from 'react';

const ForecastComponent = ({ ForcastData }) => {
  return (
    <div className=" m-5 bg-purple-200 rounded-2xl">
      <div className='font-bold text-lg mb-2 m-3'>5 Day Forecast</div>
      <hr className="mb-4" />
      <div>
        {
          ForcastData.Forcast5days.map((data, index) => {
            // Convert timestamp to readable date and day
            const date = new Date(data.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

            return (
              <div key={index} className="mb-4 m-3 p-2 bg-white rounded-lg shadow-md">
                <div className="font-medium text-lg">{day}, {formattedDate}</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{data.main.temp}°C</div>
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
