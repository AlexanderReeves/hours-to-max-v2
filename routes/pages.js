const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/home', verifyAccessToken,(req, res) => {
    console.log("Auth headers receieved in req: " + req.headers['authorization'])
    res.render('home');
});

router.get('/register', (req, res) => {
    con
    res.render('register');
});

module.exports = router;