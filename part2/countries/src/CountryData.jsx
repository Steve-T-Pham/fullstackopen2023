import axios from 'axios';
import { useState, useEffect } from 'react';

const CountryData = ({ country, api }) => {

    const [temp, setTemp] = useState(null);
    const [wind, setWind] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api}&units=metric`)
        .then(res => {
            setWind(res.data.wind.speed);
            setTemp(res.data.main.temp);
            setWeather(res.data.weather[0].icon);
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital} <br></br>
            area {country.area} <br></br>
            <h2>languages:</h2>
            <ul>
                {/* Convert object into array (languages) splitting the keys into abbreviation and language */}
                {Object.entries(country.languages).map(([abbreviation, language]) => 
                    <li key={abbreviation}>{language}</li>)
                }
            </ul>
            <img src={country.flags.png} alt="Current country's flag" />
            <h2>Weather in {country.capital}</h2>

            <div>temperature {temp} Celcius</div>
            {weather && <img src={`https://openweathermap.org/img/wn/${weather}@2x.png`} />}
            <div>wind {wind} m/s</div>
        </div>
    ); 
}

export default CountryData;