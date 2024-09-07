import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Martin flower')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={message.type}>
        {message.message}
      </div>
    )
  }

  useEffect(() => {
    personService.getAll()
      .then(data => {
        setFilteredPersons(data)
        setPersons(data)
      })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filtered = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      } else {
        console.log(newName)
        console.log(persons)
        const person = persons.filter(p => p.name === newName)[0]
        console.log('update', person.id, person.name, person.number)
        personService.updatePerson(person.id, { ...person, number: newNumber }).then(
          update_person => {
            const newPersons = persons.map(p => p.id === update_person.id ? update_person : p)
            setPersons(newPersons)
            const filtered = filter === '' ? newPersons : newPersons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            setFilteredPersons(filtered)
            setNotificationMessage({ message: `${newName} number was changed`, type: "info" })
            setTimeout(() => setNotificationMessage(null), 5000)
          }
        )
        return
      }
    }
    personService.createPerson({ name: newName, number: newNumber }).then(
      newPerson => {
        const newPersons = persons.concat(newPerson)
        setPersons(newPersons)
        const filtered = filter === '' ? newPersons : newPersons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        setFilteredPersons(filtered)
        setNewName('')
        setNewNumber('')
        setNotificationMessage({ message: `Added ${newName}`, type: 'info' })
        setTimeout(() => setNotificationMessage(null), 5000)
      }
    )
  }

  function deletePerson(id, name) {
    if (!window.confirm(`Delete ${name}?`)) {
      return;
    }
    personService.deletePerson(id).then(
      response => {
        personService.getAll().then(
          persons => {
            setPersons(persons)
            const filtered = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            setFilteredPersons(filtered)
          }
        )
      }
    ).catch(
      error => {
        setNotificationMessage({message:`Information of  ${name} has already been removed from server`, type:'error'})
        setTimeout(() => setNotificationMessage(null), 5000)
      }
    )


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}></Notification>
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm newName={newName} newNameChange={handleNewNameChange} newNumber={newNumber} newNumberChange={handleNewNumberChange}
        submitFunc={addNewPerson} />
      <h2>Numbers</h2>
      {filteredPersons.map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => deletePerson(p.id, p.name)}>delete</button></p>)}
    </div>
  )
}

export default App