const CountryData = ({ country }) => {
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
        </div>
    );
}

export default CountryData;