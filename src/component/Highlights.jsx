import React from 'react';

const Highlights = ({ weatherData, AirIndex }) => {
    // Function to convert UNIX timestamp to a readable time
    const convertToTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM AM/PM
    }

    return (
        <div className="col-span-5 row-span-2 m-3 h-full min-w-full bg-purple-500 rounded-2xl ">
            <div className=' text-xl font-bold m-2 flex '>Today's Highlight</div>

            <div className='h-2/5 min-h-10  grid gap-2 grid-cols-2 justify-center '>

                <div className='  bg-slate-700 p-5 m-4 rounded-2xl  '>
                    <div className=' font-bold text-center items-center sm:text-sm '>Sunrise & Sunset</div>
                    <div className=' md:flex gap-5 md:h-2/5 md:text-2xl lg:gap-10 lg:justify-center  mt-10 items-center sm:flex sm:text-sm'>
                        <img className="  w-10 sm:w-5" alt="Weather icon" src="http://localhost:5173/images/sunrise.png" />
                        <div >
                            {convertToTime(weatherData.sys.sunrise)}
                        </div>
                        <img className="w-10 sm:w-5" alt="Weather icon" src="http://localhost:5173/images/sunset.png" />
                        <div classname=''>
                            {convertToTime(weatherData.sys.sunset)}
                        </div>

                    </div>
                </div>
                <div className='sm:text-sm bg-slate-700 p-5 m-4 rounded-2xl'>
                    <img className="w-10" alt="Weather icon" src="http://localhost:5173/images/humidity.png" />
                    <div className='md:text-xl md:block md:p-2 md:items-center sm:grid '>
                        <p>Air Quality index:</p>
                        <p> SO<sub>2</sub>:{AirIndex.list[0].components.pm2_5}</p>
                        <p> O<sub>3</sub>:{AirIndex.list[0].components.o3}</p>
                        <p> NO<sub>2</sub>:{AirIndex.list[0].components.no2}</p>
                        <p> SO<sub>2</sub>:{AirIndex.list[0].components.so2}</p>
                    </div>


                </div>

            </div>

            <div className='m-5 p-5 flex justify-around items-center '>

                <div className=' h-40 w-2/4 bg-slate-700 p-5 m-4 rounded-2xl'>
                    <img className=" w-10" alt="Weather icon" src="http://localhost:5173/images/humidity.png" />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className=' h-40 w-2/4 bg-slate-700 p-5 m-4 rounded-2xl'>
                    <img className="w-10" alt="Weather icon" src="http://localhost:5173/images/pressure.png" />
                    <p>Pressure: {weatherData.main.pressure} hPa</p>

                </div>
                <div className=' h-40 w-2/4 bg-slate-700 p-5 m-4 rounded-2xl'>
                    <img className="w-10" alt="Weather icon" src="http://localhost:5173/images/view.png" />
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                </div>

            </div>

        </div>
    );
}

export default Highlights;
