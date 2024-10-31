import React, { useContext } from 'react'
import { weatherContext } from "../ContextApi/WeatherContext.jsx"; //

import humidity from '../assets/humidity.png';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import pressure from '../assets/pressure.png';
import airIndex from '../assets/airIndex.png';
import visibility from '../assets/view.png'

const Highlights = () => {
    const { weatherData, AirIndex } = useContext(weatherContext);

    // Function to convert UNIX timestamp to a readable time
    const convertToTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM AM/PM
    }

    return (
        <div className=" bg-purple-500 rounded-2xl ">
            <div className=' text-xl font-bold p-2 mx-3 '>Today's Highlight</div>



            <div className=' md:grid grid-flow-col text-lg p-2 '>
                <div className=' bg-slate-700 m-3 p-4 rounded-2xl  '>
                    <div className=' font-bold text-center'>Sunrise & Sunset</div>
                    <div className='inline-flex md:flex md:justify-around items-center m-4 gap-2 '>
                        <div className='flex items-center gap-2'>
                            <img className=" w-10 lg:w-20 " alt="Weather icon" src={sunrise} />
                            <p >{convertToTime(weatherData.sys.sunrise)}</p>
                        </div>
                        <div className='flex  items-center gap-2'>
                            <img className="w-10 lg:w-20" alt="Weather icon" src={sunset} />
                            <p className=''> {convertToTime(weatherData.sys.sunset)}</p>
                        </div>
                    </div>
                </div>

                <div className=' bg-slate-700  m-3 p-4 rounded-2xl'>

                    <p className='font-bold text-center'>Air Quality index:</p>
                    <div className='flex justify-center items-center lg:gap-10'>
                        <img className="w-10 lg:w-20 " alt="Weather icon" src={airIndex} />
                        <div className='sm: text-sm lg:text-base  font-bold text-slate-100 text-center p-3' >
                            <p>SO<sub>2</sub>:{AirIndex.list[0].components.pm2_5}</p>
                            <p>O<sub>3</sub>:{AirIndex.list[0].components.o3}</p>
                            <p>NO<sub>2</sub>:{AirIndex.list[0].components.no2}</p>
                            <p>SO<sub>2</sub>:{AirIndex.list[0].components.so2}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' p-3 inline-flex md:grid md:grid-flow-col gap-2 text-center'>

                <div className=' bg-slate-700 m-1 p-1 md:p-5  rounded-2xl'>
                    <img className=" w-10 md:w-20" alt="Weather icon" src={humidity} />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className=' bg-slate-700 m-1 p-1 md:p-5 rounded-2xl'>
                    <img className="w-10 md:w-20" alt="Weather icon" src={pressure} />
                    <p>Pressure: {weatherData.main.pressure} hPa</p>

                </div>
                <div className=' bg-slate-700 m-1 p-1 md:p-5  rounded-2xl'>
                    <img className="w-10 md:w-20" alt="Weather icon" src={visibility} />
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                </div>

            </div>


        </div>

    );
}

export default Highlights;
