const mongoose = require('mongoose')


//No need for urlParse or UnifiedTopology args as they were removed and deprecated
const db = mongoose.connect(process.env.DBURI, {
    dbName: process.env.DB_NAME})
.then(() => {
    console.log('mongodb connected to ' + process.env.DB_NAME)
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