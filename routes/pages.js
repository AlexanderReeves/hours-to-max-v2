const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const { verifyRegistrationToken } = require('../helpers/jwt_helper');
const cookieParser = require('../helpers/cookie_parser');
const { confirmRegistration } = require('../controllers/auth');
const User = require('../Models/user')
const createError = require('http-errors')

const router = express.Router();

// Index page rendering, will have differences if the user is signed in.
router.get('/', (req, res) => {
    console.log('req cookies found? ' + req.headers.cookie)
    username = "Player"
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
    res.render('index', { signedin: userSignedIn, username: username});
});



router.get('/home', verifyAccessToken,(req, res) => {
    res.redirect("/")
});

router.get('/logout',(req, res) => {
    res.clearCookie("authorization");
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register');
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
    res.render('login');
});

router.get('/forgot', (req, res) => {

    res.render('forgot');
});

module.exports = router;