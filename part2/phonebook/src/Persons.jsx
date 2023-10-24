const Persons = ({ persons, filter }) => {
    return(
        <ul>
            {(!filter ? 
                persons.map(person => <li key={person.id}>{person.name} {person.number}</li>) : 
                persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.id}>{person.name} {person.number}</li>))}
        </ul>
    );

}

export default Persons;