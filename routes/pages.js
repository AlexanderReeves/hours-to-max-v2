const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const { verifyRegistrationToken } = require('../helpers/jwt_helper');
const cookieParser = require('../helpers/cookie_parser');
const { confirmRegistration } = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('req cookies found? ' + req.headers.cookie)
    if(req.headers.cookie){
        //If we found a cookie, check if there's a valid and logges in user
        // Use the cookie paser to chech the req for a field called accessToken
        const userJwt = cookieParser.parseCookies(req)['accessToken']
        const username = cookieParser.parseCookies(req)['username']
        console.log(userJwt)
    }
    res.render('index', { title: "Some Username!" });
});

router.get('/home', verifyAccessToken,(req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/verify', verifyRegistrationToken, confirmRegistration,(req, res) => {
    //Did the user account verification request contain a token?
    if(req.query.token){
        console.log("The provided registration token is :" + req.query.token)
    }else{
        console.log("No verification token provided");
    }
    res.render('verify', {data: req.payload});
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;