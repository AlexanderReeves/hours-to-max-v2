//Server
const express = require('express');
//Mongoose for mongodb
const mongoose = require('mongoose');
//File pathing
const path = require('path');

//Env files
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

//App is the server
const app = express();



//No need for urlParse or UnifiedTopology args as they were removed and deprecated
//Conect via location saved in env file
const uri = process.env.DBURI;
//mongoose.connect(uri)
const db = mongoose.connect('mongodb+srv://reevesalexanderj:nala1234@hours-to-max.4jrpf.mongodb.net/?retryWrites=true&w=majority&appName=hours-to-max')
//.then can be used after async processes to do something after a promise is fulfilled.
//Start listening if db connected
    .then((result) => app.listen(3000) ,console.log("Connected to db!"), test())
    .catch((err) => console.log(err))

//__dirname is a variable that gives access to the current directory
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//Make sure you can grab data from any form
app.use(express.urlencoded({extended: false}));
//Parse json as bodies
app.use(express.json());

//HTML viewing engine
app.set('view engine', 'hbs');


//Define routes
app.use('/', require('./routes/pages'))
//register
app.use('/auth', require('./routes/auth'))

function test(){
    console.log("test");
}