const express = require('express');


//Router will direct web requests and results
const router = express.Router();


router.get('/lookup', (req, res) => {
    console.log("ATTEMPTING TO LOAD PLAYER DATA FROM JAGEX)
    // CountPageRequests();
    var username = "Arrgs";