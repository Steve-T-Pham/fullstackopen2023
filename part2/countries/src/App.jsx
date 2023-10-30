import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';
import Search from './Search';
const api_key = import.meta.env.VITE_SOME_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([]);

  const handleChange = e => {
    const input = e.target.value;
    setSearch(input);
    setFilteredSearch(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())));
  }

  const showCountry = flag => {
    setFilteredSearch(countries.filter(country => country.flag === flag));
    setSearch('');
  }

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => 
        setCountries(res.data)
      )
      .catch(err => console.log(err))
    }, [])

  return (
    <div>
      find countries <Search handleChange={handleChange} search={search} />
      
      <Countries countries={countries} search={search} filteredSearch={filteredSearch} showCountry={showCountry} api={api_key} />
   </div>
  )
}

export default App;
