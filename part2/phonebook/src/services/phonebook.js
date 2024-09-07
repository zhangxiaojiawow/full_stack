import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

function getAll() {
    return axios.get(baseUrl).then(response => response.data)
}

function createPerson(person) {
    return axios.post(baseUrl, person).then(response => response.data)
}

function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

function updatePerson(id, person) {
    return axios.put(`${baseUrl}/${id}`, person).then(response => response.data)
}


export default {
    getAll,
    createPerson,
    deletePerson,
    updatePerson,
}