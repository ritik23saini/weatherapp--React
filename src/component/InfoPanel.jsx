import React from 'react'

const InfoPanel = ({ weatherData }) => {
    return (
        weatherData && (
            <div className="m-2 grid text-2xl h-screen grid-cols-6 grid-rows-5 gap-2 bg-slate-600 sm:gap-1">


                <div className=" row-start-1 row-span-2  bg-purple-600 m-5 p-4  rounded-xl col-span-6 sm:text-lg sm:col-span-2  md:text-2xl xl:col-span-1">
                    <p>Now</p>
                    <p>Weather in {weatherData.name}</p>
                    
                    <div className='flex justify-around items-center'>
                        <p className="sm:text-2xl md:text-4xl font-bold">{Math.floor(weatherData.main.temp)}°C</p>
                        <img className="h-1/2 w-1/2" alt="Weather icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
                    </div>

                    <p>Weather: {weatherData.weather[0].description}</p>
                    <hr />
                    <p>Humidity: {weatherData.main.humidity}%</p>

                </div>

                {/* h-fit */}
                <div className="row-start-1 row-span-3 col-span-6 m-5 bg-purple-500 rounded-2xl sm:col-span-4 md:col-start-3 md:col-span-4 xl:col-span-6">
                    {/* Add content here */}
                </div>

                <div className=" sm:text-lg row-start-3 row-span-3 m-5 col-span-2 bg-purple-950 rounded-2xl sm:col-span-2 xl:col-span-1">
                    <div className='p-1 m-1'>5 Day Forecast</div>
                    <div className='bg-slate-500'>
                        {/* Add content here */}
                    </div>
                </div>

                <div className="row-start-4 row-span-2 col-span-6 m-5 bg-purple-300 rounded-2xl sm:col-span-6 md:col-start-3 md:col-span-4 xl:col-span-6">
                    {/* Add content here */}
                </div>
            </div>
        )
    );
}




export default InfoPanel;
