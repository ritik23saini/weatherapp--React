import React from 'react';
import humidity from '../assets/humidity.png';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import pressure from '../assets/pressure.png';
import airIndex from '../assets/airIndex.png';
import visibility from '../assets/view.png'

const Highlights = ({ weatherData, AirIndex }) => {
    // Function to convert UNIX timestamp to a readable time
    const convertToTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM AM/PM
    }

    return (
        <div className="   sm:h-[65%] bg-purple-500 rounded-2xl ">
            <div className=' text-xl font-bold p-2 mx-3 '>Today's Highlight</div>
            <div className=' text-lg grid grid-flow-col m-5 gap-2'>

                <div className=' bg-slate-700 py-3 px-2 rounded-2xl  '>
                    <div className=' font-bold text-center '>Sunrise & Sunset</div>
                    <div className='md:flex px-5 gap-2 justify-around items-center m-5 '>
                        <img className=" w-20 " alt="Weather icon" src={sunrise} />
                        <div >
                            {convertToTime(weatherData.sys.sunrise)}
                        </div>
                        <img className="w-20" alt="Weather icon" src={sunset} />
                        <div className=''>
                            {convertToTime(weatherData.sys.sunset)}
                        </div>

                    </div>
                </div>
                <div className=' flex justify-evenly items-center bg-slate-700 p-5 rounded-2xl'>
                    <img className="h-20" alt="Weather icon" src={airIndex} />
                    <div>
                        <p className='font-bold '>Air Quality index:</p>
                        <p> SO<sub>2</sub>:{AirIndex.list[0].components.pm2_5}</p>
                        <p> O<sub>3</sub>:{AirIndex.list[0].components.o3}</p>
                        <p> NO<sub>2</sub>:{AirIndex.list[0].components.no2}</p>
                        <p> SO<sub>2</sub>:{AirIndex.list[0].components.so2}</p>
                    </div>
                </div>

            </div>
            <div className=' mb-5 p-5 grid grid-flow-col gap-2 text-xl'>

                <div className=' bg-slate-700  p-5  rounded-2xl'>
                    <img className=" w-10" alt="Weather icon" src={humidity} />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className=' bg-slate-700 p-5 rounded-2xl'>
                    <img className="w-10" alt="Weather icon" src={pressure} />
                    <p>Pressure: {weatherData.main.pressure} hPa</p>

                </div>
                <div className=' bg-slate-700 p-5  rounded-2xl'>
                    <img className="w-10" alt="Weather icon" src={visibility} />
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                </div>

            </div>
        </div>
    );
}

export default Highlights;
