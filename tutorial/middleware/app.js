//Load in express
const express =  require('express');

//Set the app variable to a call of the express main function
const app = express();

//Set the default route request and response
app.get('/', (req, res, next) => {
    //default response to a request
    res.send('<h1>Hello, World!</h1>')

});

app.listen(3000);