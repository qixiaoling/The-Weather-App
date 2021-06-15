import React, { useEffect, useState } from 'react';
import './ForecastTab.css';
import axios from "axios";
import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import createDateString from "../../helpers/createDateString";
const apiKey = 'b7ae113310db05940950e41fd1692a30';

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)



    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
                setForecasts(result.data.daily.slice(1, 6));
                setLoading(false);
            } catch (e) {
                console.error(e);
                setError(true)
                setLoading(false);
            }

        }

        if (coordinates) {
            fetchData();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">

            {forecasts && forecasts.map((forecast) => {
                return (
                    <article className="forecast-day" key={forecast.dt}>
                        <p className="day-description">
                            {createDateString(forecast.dt)}
                        </p>

                        <section className="forecast-weather">
                            <span>
                                {kelvinToCelcius(forecast.temp.day)}
                            </span>
                            <span className="weather-description">
                                {forecast.weather[0].description}
                            </span>
                        </section>
                    </article>
                )
            })}


            {!forecasts && !error &&(
                <span className='no-forecast'>
                    Zoek eerste een locatie om het weer voor deze week te bekijken.
                </span>
            )}
            {error &&(
                <span>
                    Er is iets misgegaan met het ophalen van de data.
                </span>
            ) }

            {loading && (<span>Loading...</span>)}
        </div>
    );
};

export default ForecastTab;