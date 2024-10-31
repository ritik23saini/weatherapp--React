import React, { useContext } from "react";
import ForecastComponent from '../component/ForecastComponent';
import WeatherInfo from '../component/WeatherInfo';
import Highlights from '../component/Highlights';
import HourlyUpdate from '../component/HourlyUpdate';

import { weatherContext } from "../ContextApi/WeatherContext.jsx";

const InfoPanel = () => {
    const { weatherData } = useContext(weatherContext);

    return (
        weatherData && (
            <div className='max-h-fit mt-3 py-1 md:grid md:grid-cols-6 gap-1'>
                <div className="m-4 md:col-span-2 xl:col-span-1">
                    <WeatherInfo />
                    <ForecastComponent />
                </div>
                <div className="m-4 md:col-span-4 xl:col-span-5">
                    <Highlights />
                    <HourlyUpdate />
                </div>
            </div>


        )
    );
}




export default InfoPanel;
