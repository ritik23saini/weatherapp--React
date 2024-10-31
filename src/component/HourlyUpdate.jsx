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
        <div className=" md: h-[40%] flex flex-col  bg-purple-300 mt-5 rounded-2xl text-xl">
            {/* Header */}
            <div className="mt-3 mx-2 p-2 font-bold text-xl">Hourly Updates</div>

            {/* Content taking remaining height */}
            <div className='flex-grow flex justify-evenly items-center '>
                {ForcastData.Hourlyforecast.map((data) => {
                    const time = getTime(data.dt_txt);
                    return (
                        <div key={data.dt} className='rounded-xl gap-1 p-1 md:gap-7 bg-white sm:m-2 sm:p-4 inline-grid md:grid items-center'>
                            <div className="text-sm font-bold">{time}</div>
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
                            <div className="text-sm lg:text-lg font-bold">{data.main.temp}°C</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyUpdate;
