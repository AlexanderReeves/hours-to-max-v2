const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const { verifyRegistrationToken } = require('../helpers/jwt_helper');
const cookieParser = require('../helpers/cookie_parser');
const { confirmRegistration } = require('../controllers/auth');
const User = require('../Models/user')
const createError = require('http-errors')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')

//Log the number of page loads to the count.txt file
const fs = require('node:fs');
function CountPageRequests(){
    //Load total page reads
    count = 0
    readData = fs.readFileSync('./count.txt').toString()
    readData = parseInt(readData)
    readData ++
    readData = readData.toString()
    console.log("Total index page requests to date : " + readData)
    //Save updated tally to file
    fs.writeFile('count.txt', readData, 'utf-8', err2 => {
    if (err2) {
        console.log(err2)
    }
    })
}

//Router will direct web requests and results
const router = express.Router();

// Index page rendering, will have differences if the user is signed in.
router.get('/', verifyAccessToken,(req, res) => {
    CountPageRequests();
    username = "Player"
    userSignedIn = false
    if(req.verifiedUser){
        username = req.payload.username
        console.log("The page was requested from verified user " + username)
        if(username){
            userSignedIn = true
        }else{
            console.log("JWT cookies were found to be invalid, removing them")
            res.clearCookie("authorization");
        }
    }
    res.render('index', { signedin: userSignedIn, username: username});
});

// router.get('/home', verifyAccessToken,(req, res) => {
//     res.redirect("/")
// });

router.get('/logout',(req, res) => {
    console.log('Signing out user')
    res.clearCookie("authorization");
    res.clearCookie("refreshAuthorization");
    res.redirect('/');
});

router.get('/register', (req, res) => {
    //The registration page shouldn't be seen if the user is currently signed in

    //Prevent the registration page from caching
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    //If the user already signed in, and has a JWT, they should be redirected to the index home page
    userSignedIn = false
    if(req.headers.cookie){
        //If we found a cookie, check that it belongs to a valid user
        // Use the cookie paser to chech the req for a field called authorization
        const userJwt = cookieParser.parseCookies(req)['authorization']
        username = cookieParser.parseCookies(req)['username']
        if(userJwt){
            userSignedIn = true
        }
    }
    //If the user is already signed in, go to home page
    if(userSignedIn){
        res.redirect('/');
    }else{
        //If not signed in, show a fresh login page
        res.render('register');
    }
});


router.get('/verify', verifyRegistrationToken, confirmRegistration,(req, res) => {
    //Did the user account verification request contain a token?
    console.log('Verification status: ' + res.resolution)
    if(req.query.token){
        console.log("The provided registration token is :" + req.query.token)
    }else{
        console.log("No verification token provided");
    }
    verifiedEmail = JSON.stringify(req.payload.email)
    verifiedEmail = verifiedEmail.replace(/(['"])/g, "")
    res.render('verify', {data: verifiedEmail, response: res.resolution});
});

router.get('/newpassword', async(req, res, next) => {
    //Did the reset password request contain a token?

    if(req.query.token){
        console.log("The provided reset token is " + req.query.token)
    }else{
        console.log("No verification token provided");
    }

    const user = await User.findOne({resetToken: req.query.token})
    console.log(user)
    //If it fails, return a create Error, and move to the next error middleware in main
    if (!user) return next(createError.NotFound("Invalid reset token"))
    //Otherwise render the pass reset page
    res.render('newpass', {data: req.payload});

});


router.get('/login', (req, res) => {
    //The login shouldn't be seen if the user is currently signed in
    //If the back button is pressed after sign in, a cached version of the login page appears.

    //Prevent the login page from caching
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    //If the user already signed in, and has a JWT, they should be redirected to the index home page
    userSignedIn = false
    if(req.headers.cookie){
        //If we found a cookie, check that it belongs to a valid user
        // Use the cookie paser to chech the req for a field called authorization
        const userJwt = cookieParser.parseCookies(req)['authorization']
        username = cookieParser.parseCookies(req)['username']
        if(userJwt){
            userSignedIn = true
        }
    }
    //If the user is already signed in, go to home page
    if(userSignedIn){
        res.redirect('/');
    }else{
        //If not signed in, show a fresh login page
        res.render('login');
    }
});

router.get('/forgot', (req, res) => {
    //This page can render for both signed in and non signed in users
    res.render('forgot');
});

module.exports = router;

