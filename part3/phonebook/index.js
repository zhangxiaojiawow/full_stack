require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Phonebook = require('./models/phonebook')
var morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body)
    ].join(' ')
}))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    Phonebook.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/info', (request, response) => {
    const date = new Date().toString();
    Phonebook.countDocuments().then(count => {
        response.send(`<div><p>Phonebook has info for ${count} people</p><p>${date}</p></div>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id).then(result => {
        response.json(result)
    }).catch(error => {next(error)})
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      name: body.name,
      number: body.number,
    }
  
    Phonebook.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedPhonebook => {
        response.json(updatedPhonebook)
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => { next(error) })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
        response.status(400).json({ "error": "name is missing" })
        return
    }
    if (!body.number) {
        response.status(400).json({ "error": "number is missing" })
        return
    }
    Phonebook.find({ name: body.name }).then(result => {
        if (result.length > 0) {
            response.status(400).json({ "error": 'name must be unique' })
            return
        }
    })
    const newPerson = Phonebook({
        name: body.name,
        number: body.number,
    })
    newPerson.save().then(savedPhonebook => {
        response.json(savedPhonebook)
    }).catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error('hello world')

    if (error.name === 'CastError') {
        console.log("match error")
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name == 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(3001)