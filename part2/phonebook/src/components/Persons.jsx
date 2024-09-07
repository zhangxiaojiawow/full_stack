const Persons = ({filteredPersons}) => (
    <>
    {filteredPersons.map(p => <p key={p.name}>{p.name} {p.number} <button>delete</button></p>)}
    </>
)

export default Persons