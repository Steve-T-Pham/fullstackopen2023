import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])    
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const addName = (e) => {
    e.preventDefault();
    const isDuplicate = persons.find(person => person.name === newName);
    if (!isDuplicate){
      const newPersonObject = {
        name: newName
      }
      setPersons(persons.concat(newPersonObject));
      setNewName('');
    }
    else
      alert(`${newName} is already added to phonebook`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App