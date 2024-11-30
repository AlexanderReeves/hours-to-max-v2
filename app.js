//Server
const express = require('express');
//Mongoose for mongodb
const mongoose = require('mongoose');
//File pathing
const path = require('path');
//Error logging tool
const morgan = require('morgan');
console.log("Server booting")

//Env files
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
require('./helpers/init_mongodb')

//const {verifyAccessToken, verifyRegistrationToken} = require('./helpers/jwt_helper')

//App is the server
const app = express();
//Enable a folder for public assets and JS files (Non server JS)
app.use(express.static('public'))

//For destructure...
//
//Trying to make destructuring work...
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

//No need for urlParse or UnifiedTopology args as they were removed and deprecated
//Conect via location saved in env file
const uri = process.env.DBURI;
//code below moved to helpers.
//mongoose.connect(uri)
// const db = mongoose.connect('mongodb+srv://reevesalexanderj:nala1234@hours-to-max.4jrpf.mongodb.net/?retryWrites=true&w=majority&appName=hours-to-max')
// //.then can be used after async processes to do something after a promise is fulfilled.
// //Start listening if db connected
//     .then((result) => app.listen(3000) ,console.log("Connected to db!"), test())
//     .catch((err) => console.log(err))

app.listen(3000)

//__dirname is a variable that gives access to the current directory
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//Make sure you can grab data from any form
app.use(express.urlencoded({extended: false}));

//HTML viewing engine
app.set('view engine', 'hbs');


//Define routes
app.use(express.json())
app.use('/' ,require('./routes/pages'))
//register
app.use('/auth', require('./routes/auth'))

//Finally, error handling middleware

//If we have made it to this code without already sending a response, send this message
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
    url = req.url;
    res.render('problem', {title: 'Invalid Request', url: url });
  })

//No matching route response runs after all other checks are done
app.use(function(req, res) {
    // Invalid request
    res.status(404)
    url = req.url;
    res.render('problem', {title: 'The server couldn\'t find what you were looking for!', url: url });
});

function test(){
    console.log("test");
}