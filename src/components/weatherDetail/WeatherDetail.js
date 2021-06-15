import React, {useContext} from 'react';
import './WeatherDetail.css';
import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import iconMapper from "../../helpers/iconMapper";
import {TempContextProvider} from "../../context/TempProvider"


function WeatherDetail({temp, description, type}) {
    const {kelvinToMetric} = useContext(TempContextProvider);

  return (
    <section className="day-part">
      <span className="icon-wrapper">
          {iconMapper(type)}
      </span>
      <p className="description">{description}</p>
      <p>{kelvinToMetric(temp)}</p>
    </section>
  );
};

export default WeatherDetail;
