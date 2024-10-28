//Load in express
const express =  require('express');

//Set the app variable to a call of the express main function
const app = express();

//This is gloabl middleware! It should run regardless of which url is called
app.use(middleware1);
app.use(middleware2);

/* requestObject and responseObject are default objects provided by express
More details here 
https://www.geeksforgeeks.org/explain-the-use-of-req-and-res-objects-in-express-js
We use them here as default parameters, req, and res. */

//these are fake demo middleware examples
function middlewareWithErrors (req, res, next){
    console.log('I am a middleware with error')
    /* If we have an error, we should send it through 
    to our next function so it can be handled */
    const errObj = new Error('I am an error');
    //next(errObj);
    next();
}

function middleware1(req, res, next){
    //As these requests and responses get passed through every middleware
    //Whatever variables are added will be available to the next middleware
    req.customProperty = 100;
    console.log('I am middleware 1');
    next();
}

function middleware2(req, res, next){
    console.log('I am middleware 2');
    console.log(`custom val is: ${req.customProperty}`);
    req.customProperty = 600;
    next();
}

function middleware3(req, res, next){
    console.log('I am middleware 3');
    next();
}

//The same but with an extra parameter!
function errorHandler(err, req, res, next){
     if(err){
         res.send('<h1>There was an error! Please try again</h1>');
     }
}
 
/* Set the default route request and response
The express framework (Web connection tools to handle routing and internet stuff),
allows us to add as many parameters/functions to the routes as we want! */

//app.get is using express get function
app.get('/', middleware3, (req,res,next) =>
{   
    console.log('I am the standard express function');
    res.send(`<h1>Hello, World! The value is: ${req.customProperty}</h1>`);
    console.log('Request URL:', req.url);
})

//Run error handling as the final thing
app.use(errorHandler);
//Listen for requests
app.listen(3000);