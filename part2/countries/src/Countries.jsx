import CountryData from "./CountryData";

const Countries = ({ filteredSearch, showCountry, api }) => {

    if (filteredSearch.length <= 10 && filteredSearch.length != 1) {
        return(
            <div>
                {filteredSearch.map(country => <div key={country.flag}>{country.name.common} <button onClick={() => showCountry(country.flag)}>show</button></div>)}
            </div>
        )
    }
    else if (filteredSearch.length === 1){
        return(
            <CountryData country={filteredSearch[0]} api={api}/>
        );
    }
    else {
        return(
            <div>Too many matches, specify another filter</div>
        );
    }
}

export default Countries;