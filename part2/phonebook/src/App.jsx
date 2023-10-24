import { useState, useEffect } from 'react';
import axios from 'axios';
import personsService from './services/persons';
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
      personsService 
        .create(newPersonObject)
        .then(returnedPerson => {      
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
    else
      alert(`${newName} is already added to phonebook`);
  }

  const deleteName = id => {
        personsService
          .remove(id)
          .then(returnedPerson => 
            console.log(returnedPerson)
          );
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)
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

      <Persons persons={persons} filter={filter} deleteName={deleteName} />
    </div>
  )
}

export default App;