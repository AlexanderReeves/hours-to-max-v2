const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const cookieParser = require('../helpers/cookie_parser')

const router = express.Router();

router.get('/', (req, res) => {
    console.log('req cookies found? ' + req.headers.cookie)
    if(req.headers.cookie){
        //If we found a cookie, check if there's a valid and logges in user
        const userJwt = cookieParser.parseCookies(req)['accessToken']
        console.log(userJwt)
    }
    
    
    res.render('index', { title: "Some Username!" });
});

router.get('/home', verifyAccessToken,(req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    con
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;