import { useState, useEffect } from 'react';
import axios from 'axios';
import personsService from './services/persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])    
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        number: newNumber
      }
      personsService 
        .create(newPersonObject)
        .then(returnedPerson => {      
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setNewName('');
          setNewNumber('');
        })
    }
    else{
      (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) 
      ? updateName(persons.find(person => person.name === newName).id)
      : null)
    }
  }

  const deleteName = id => {
        personsService
          .remove(id)
          .then(() =>
            setPersons(persons.filter(p => p.id !== id))
          );
  }

  const updateName = id => {
    const person = persons.find(p => p.id === id)
      const changedPerson = {...person, number: newNumber}
      personsService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setSuccessMessage(`Updated ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(err => {
          setErrorMessage(`Information of ${newName} has already been removed from server`);          
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    setNewName('');
    setNewNumber('');
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
      <Notification successMessage={successMessage}  errorMessage={errorMessage} />
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