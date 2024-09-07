const PersonForm = ({newName, newNameChange, newNumber, newNumberChange, submitFunc}) => (
    <form onSubmit={submitFunc}>
    <h3>add a new</h3>
    <div>
      name: <input value={newName}  onChange={newNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={newNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm