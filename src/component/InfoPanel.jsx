import React from 'react'
import { Forecast } from './forecast';
import WeatherInfo from './weatherInfo';
import Highlights from './Highlights';
import { HourlyUpdate } from './HourlyUpdate';

const InfoPanel = ({ weatherData, AirIndex, ForcastData }) => {
    return (  /* h-fit */

        weatherData && (
            <div className="h-screen grid md:grid-cols-6 grid-rows-3 min-w-[510px] gap-2 p-2 grid-cols-1">
                <WeatherInfo weatherData={weatherData} />
                <Highlights weatherData={weatherData} AirIndex={AirIndex} />
                <Forecast ForcastData={ForcastData} />
                <HourlyUpdate />
            </div>
        )
    );
}




export default InfoPanel;
