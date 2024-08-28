import React from 'react';

const HourlyUpdate = ({ ForcastData }) => {
    // Function to get time in 12-hour format
    const getTime = (dt_txt) => {
        const date = new Date(dt_txt);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format, 0 is treated as 12
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className=" m-5  bg-purple-300 rounded-2xl">
            <div className='block m-2 p-2'>Today</div>
            <div className='flex  m-2 p-2 justify-evenly'>
                {ForcastData.Hourlyforecast.map((data, index) => {
                    // Get the time for the current forecast item
                    const time = getTime(data.dt_txt);

                    return (
                        <div key={index} className=' bg-slate-600 rounded-xl flex mb-3 p-1'>
                            <div className="grid items-center">
                                <div className="font-bold">{time}</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                    alt={data.weather[0].description}
                                    className="ml-4"
                                />
                                <div className="text-xl font-bold">{data.main.temp}°C</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyUpdate;
