const mongoose = require('mongoose')


//No need for urlParse or UnifiedTopology args as they were removed and deprecated
const db = mongoose.connect('mongodb+srv://reevesalexanderj:nala1234@hours-to-max.4jrpf.mongodb.net/?retryWrites=true&w=majority&appName=hours-to-max', {
    dbName: "hours_to_max"})
.then(() => {
    console.log('mongodb connected')
})
.catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
console.log('Mongoose has connected to the db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

//SIGINT runs on ctrl c, it's like a listener
process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit(0)
})