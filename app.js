//Server
console.log("The Hours To Max web server is starting.")

//Express website hosting
const express = require('express');
//Mongoose for mongodb database
const mongoose = require('mongoose');
//File pathing
const path = require('path');
//Error logging tool
const morgan = require('morgan');
//Env files
const dotenv = require('dotenv');
//Rate limiter to handle spam requests and loading limits, etc
const rateLimit = require('express-rate-limit')


//Load the server in production, unless windows parsed a dev env variable
if(`${process.env.NODE_ENV}` == 'undefined'){
    console.log("NODE_ENV variable could not be parsed")
    console.log("Environment: PRODUCTION")
    dotenv.config({ path: `./.env.production`  });
}else{
    console.log("env parsed successfully")
    console.log("Environment: DEVELOPMENT")
    dotenv.config({ path: `./.env.${process.env.NODE_ENV}`  });
}
//Check the dotenv variables loaded
// console.log(`${process.env.testkey}` + " Is a test env variable.")

//Connect to mongodb via the helper tool
require('./helpers/init_mongodb')

//Load the app as an express server
const app = express();
//Enable a folder for public assets and JS files (Non server JS)
app.use(express.static('public'))


//Allow json creation and destructuring
app.use(express.json())
//Allow express to parse url payloads
app.use(express.urlencoded({ extended: false }))

//Use morgan for error codes and logging in console
app.use(morgan('dev'))

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
    message: "Sorry, you have been rate limited. Please try again later."
})
app.use(limiter)

//Listen on port 3000 for requests
app.listen(3000)

//__dirname is a variable that gives access to the current directory
//Allow public access to assets in public folder
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//HTML viewing engine for html rendering
app.set('view engine', 'hbs');


//Define web traffic routes
app.use(express.json())
app.use('/' ,require('./routes/pages'))
//register
app.use('/auth', require('./routes/auth'))
//find things
app.use('/find', require('./routes/find'))
//save things
app.use('/save', require('./routes/save'))

//***Error handling middleware***

//If we have made it to this code without already sending a response, send this message
app.use((err, req, res, next) => {
    //log error in console
    console.error(err.stack)
    //Set error response status message
    res.status(500)
    //Get the request url
    url = req.url;
    //Load the error page including invalid url
    res.render('problem', {title: 'Invalid Request', url: url });
  })

//No matching route response runs after all other checks are done
app.use(function(req, res) {
    // Invalid request
    res.status(404)
    //If route does not exist send the problem page with different message
    url = req.url;
    res.render('problem', {title: 'The server couldn\'t find what you were looking for!', url: url });
});

console.log("The server has finished loading. Database connection may still be in progress.")
