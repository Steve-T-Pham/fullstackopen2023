const Persons = ({ persons, filter, deleteName }) => {

    return(
        <ul>
            {(!filter ? 
                persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button></li>) : 
                persons.filter(person => 
                    person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => 
                    <li key={person.id}>{person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button></li>)
            )}
        </ul>
    );

}

export default Persons;