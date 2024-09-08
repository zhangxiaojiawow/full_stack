const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: true
    },
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)

