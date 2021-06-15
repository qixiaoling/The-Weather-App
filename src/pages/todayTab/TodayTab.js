import React, {useState, useEffect} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";
const apiKey = 'b7ae113310db05940950e41fd1692a30';

function TodayTab({coordinates}) {
	const[forecasts, setForecasts] = useState(null);
	const[error, setError] = useState(false);
	const[loading, toggleLoading] = useState(false);

	useEffect(()=>{

		async function fetchData(){
			toggleLoading(true);
			setError(false);
			try{
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${ coordinates.lat }&lon=${ coordinates.lon }&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}`);
				setForecasts([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],

				])
				console.log(result.data)
				toggleLoading(false)
			}catch(e){
				console.error(e);
				toggleLoading(false)
				setError(true);
			}
		}
		if(coordinates){
			fetchData();
		}
	}, [coordinates])

	return(
		<div className="tab-wrapper">
			{forecasts &&
				<>
					<div className="chart">
						{forecasts.map((forecast) => {
							return <WeatherDetail
								key={forecast.dt}
								temp={forecast.temp}
								type={forecast.weather[0].main}
								description={forecast.weather[0].description}
							/>
						})}
					</div>
					<div className="legend">
						{forecasts.map((forecast)=>{
							return <span key={forecast.dt}>{createTimeString(forecast.dt)}</span>
						})}
					</div>
				</>
			}
			{error && (<span>Er is its misgegaan met het ophalen van de data.</span>)}
			{loading && (<span>Loading...</span>)}
		</div>
	);
};

export default TodayTab;