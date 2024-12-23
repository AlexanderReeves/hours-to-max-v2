//Server
const express = require('express');
//Mongoose for mongodb
const mongoose = require('mongoose');
//File pathing
const path = require('path');
//Error logging tool
const morgan = require('morgan');
console.log("Server booting")
console.log(`${process.env.testkey}` + "Is a test env variable")
console.log("Env variable done")
//Env files
const dotenv = require('dotenv');
console.log(`WORK ENVIRONMENT ${process.env.NODE_ENV}`)

//If the app is in dev, use the dotenv file, otherwise use the environment variables from digitalocean configs
if(process.env.NODE_ENV == "development"){    
    dotenv.config({ path: `./.env.${process.env.NODE_ENV}`  });
}
require('./helpers/init_mongodb')

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
//find things
app.use('/find', require('./routes/find'))
//save things
app.use('/save', require('./routes/save'))

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