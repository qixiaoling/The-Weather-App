import React, {createContext, useState} from 'react';
import kelvinToCelcius from "../helpers/kelvinToCelcius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const tempContext = createContext(null);

function TempContextProvider({children}){
    const[selectedMetric, toggleSelectedMetric] = useState('celcius');

    function toggleTemp(){
        if(selectedMetric === 'celcius'){
            toggleSelectedMetric('fahrenheit');
        }else{
            toggleSelectedMetric('celcius');
        }
    }


    return(
        <TempContext.Provider value={{
            toggleTemp: toggleTemp, // mag een naam weghalen
            kelvinToMetric: selectedMetric === 'celcius' ? kelvinToCelcius :
                kelvinToFahrenheit,
        }}>
            {children}
        </TempContext.Provider>
    )
}
export default TempContextProvider