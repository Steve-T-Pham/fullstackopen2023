const Persons = ({ persons, filter, deleteName }) => {

    return(
        <div>
            {(!filter ? 
                persons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button></div>) : 
                persons.filter(person => 
                    person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => 
                    <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button></div>)
            )}
        </div>
    );

}

export default Persons;