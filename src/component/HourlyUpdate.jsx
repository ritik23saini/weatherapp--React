import React, { useContext } from 'react';
import { weatherContext } from "../ContextApi/WeatherContext.jsx";

const getTime = (dt_txt) => {
    const date = new Date(dt_txt);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format, 0 is treated as 12
    return `${hours}:${minutes} ${ampm}`;
};

const HourlyUpdate = () => {
    const { ForcastData } = useContext(weatherContext);

    return (
        <div className="bg-purple-300 rounded-2xl">
            <div className='mt-3 mx-2 p-2 font-bold text-xl'>Hourly Updates</div>

            {ForcastData.Hourlyforecast.map((data) => {
                // Get the time for the current forecast item
                const time = getTime(data.dt_txt);
                return (
                    <div key={data.dt} className='inline-grid m-5 p-1 rounded-lg bg-white text-center'>
                        <div className='grid justify-evenly items-center'>
                            <div className="text-sm font-bold">{time}</div>
                            <img
                                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                alt={data.weather[0].description}
                            />
                            <div className="text-sm lg:text-lg font-bold">{data.main.temp}°C</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HourlyUpdate;
