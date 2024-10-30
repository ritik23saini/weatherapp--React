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
        <div className=" h-2/4 bg-purple-300 rounded-2xl ">
            <div className='mx-4 p-2 font-bold text-xl'>Hourly Updates</div>
            <div className=' flex  '>
                {ForcastData.Hourlyforecast.map((data, index) => {
                    // Get the time for the current forecast item
                    const time = getTime(data.dt_txt);

                    return (
                        <div key={index} className=' md:w-[15%] flex  bg-slate-700 shadow-md rounded-xl mx-auto md:mt-10 p-5'>
                            <div className="flex flex-col ">
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
        </div>
    );
};

export default HourlyUpdate;
