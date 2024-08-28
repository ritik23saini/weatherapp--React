import React from 'react'
import ForecastComponent from './ForecastComponent';
import WeatherInfo from './WeatherInfo';
import Highlights from './Highlights';
import HourlyUpdate from './HourlyUpdate';

const InfoPanel = ({ weatherData, AirIndex, ForcastData }) => {
    return (  /* h-fit */

        weatherData&&(
        <div className='p-1'>
            <WeatherInfo weatherData={weatherData} />
            <Highlights weatherData={weatherData} AirIndex={AirIndex} />
            <ForecastComponent ForcastData={ForcastData} />
            <HourlyUpdate ForcastData={ForcastData} />
        </div>
    )
    );
}




export default InfoPanel;
