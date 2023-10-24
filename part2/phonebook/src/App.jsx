import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import Filter from './Filter';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])    
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const addName = (e) => {
    e.preventDefault();
    const isDuplicate = persons.find(person => person.name === newName);
    if (!isDuplicate){
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPersonObject));
      setNewName('');
      setNewNumber('');
    }
    else
      alert(`${newName} is already added to phonebook`);
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h3>add a new</h3>

      <PersonForm 
        addName={addName} 
        handleNumberChange={handleNumberChange} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        newName={newName} 
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App;