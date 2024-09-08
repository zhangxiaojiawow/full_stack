const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url = `mongodb+srv://zhangxiaojia96:${password}@cluster0.nfd3i.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (name && number) {
    const phoneboook = Phonebook({ name, number })
    phoneboook.save().then(request => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    Phonebook.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(phonebook => {
            console.log(phonebook.name, phonebook.number)
        })
        mongoose.connection.close()
    })
}