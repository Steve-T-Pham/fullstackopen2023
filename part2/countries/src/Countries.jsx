import CountryData from "./CountryData";

const Countries = ({ filteredSearch, showCountry }) => {

    if (filteredSearch.length <= 10 && filteredSearch.length != 1) {
        return(
            <ul>
                {filteredSearch.map(country => <li key={country.flag}>{country.name.common} <button onClick={() => showCountry(country.flag)}>show</button></li>)}
            </ul>
        )
    }
    else if (filteredSearch.length === 1){
        return(
            <CountryData country={filteredSearch[0]}/>
        );
    }
    else {
        return(
            <div>Too many matches, specify another filter</div>
        );
    }
}

export default Countries;