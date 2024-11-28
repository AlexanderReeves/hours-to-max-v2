//Mongoose for mongodb
const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema, loginSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')
const mailHelper = require('../helpers/mailer')
const bcrypt = require('bcrypt')


//For cookies
//const express = require('express');

exports.register = async (req, res , next) => {
    //Create a Json response for the form to receive
    res.setHeader('Content-Type', 'application/json');
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { username: username, userEmail: email, userPass: password } = req.body;
        //Validation the submission against the registration schema
        console.log('Validating new user: ' + username)
        result = "empty result"
        //warning = 'empty warning'
        console.log('about to run validation')
        try{
            result = await authSchema.validateAsync({username, email, password}, {warnings: true});

        } catch(err){
            //If this fails, result remains unchanged from its original declaration
            console.log("Joi Error Message: " + err.message)
            //console.log(Object.getOwnPropertyNames(err))
            //From here, set a https error code, a message, and return to requester!
            res.status(422).json({'error': err.message})
            //If joi validation fails, end function
            return
        }
        console.log('Joi validation was successful.')

        //Try encrypt password early
        try{
            hPassword = await encryptPassword(password)
            console.log("Tried and result:" + hPassword)

        } catch(err){
            console.log("failed password encryption somehow")
            return
        }
        
        //If that email is used in the db, throw an error
        const emailDoesExist = await User.findOne({email: email})
        if(emailDoesExist){
            //throw createError.Conflict(`Sorry! ${email} is already registered`)
            console.log('continue')
            res.status(422).json({'error': `${email} is already registered`})
        } 
        //If that username is used in the db, throw an error
        const usernameDoesExist = await User.findOne({username: username})
        if(usernameDoesExist) throw createError.Conflict(`${username} is already taken!`)
        
        
        //And we can use the destructed data to creat our new user, setting the syntax is like
        //somedatabaseitemname:currentvariablename
        const confirmed = false
        const user = new User({username, email, password: hashedPass, confirmed})

        const savedUser = await user.save()
        console.log(savedUser)
        console.log('A new user was added to the database! user: ' + savedUser.id)

        //=====================================================
        //Once the user is registered, use jwt helper to create a jwt for them
        //The password should be encrypted before it is added to the jwt.
        const accessToken = await signAccessToken(savedUser.id, email, hashedPass)
        console.log('Sending the new user a jwt access token.' + accessToken)
        res.cookie('authorization', accessToken)
        res.send(JSON.stringify({ success: 'You have been registered!' }))




        //Send the registration email######################################
        mailHelper.registrationEmail(accessToken, hashedPass)


    //###################################################################


    } catch(error){
        console.log(error)

    }
    //res.send("Form submitted");
}   

exports.login = async (req, res, next ) => {
    //console.log(req.body);
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { userEmail: email, userPass: password } = req.body;
        console.log('Login validation values: ' + email + '   ' + password)

        //const result = await authSchema.validateAsync({email,password});
        const result = await loginSchema.validateAsync({email,password});
        console.log(result)

        const user = await User.findOne({email: result.email})
        if (!user) throw createError.NotFound("Username/Password was not valid")
        //If user exists, check for valid password via our custom userjs function
        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized("Username/Password was not valid")

        //Check is the user confirmed their email address already
        //We shouldn't need to send in any params as it will just chekc the current object
        console.log('User confirmed status: ' + user.confirmed)
        if(!user.confirmed) throw createError.Unauthorized("User email has not been confirmed!")

        //If sign in was okay
        const accessToken = await signAccessToken(user.id)
        
        console.log('sending cookie')
        res.cookie('authorization', accessToken)
        //res.send(accessToken)
    } catch(error){
        console.log(error)
        if(error.isJoi === true) return next(createError.BadRequest("Joi has rejected your input values!"))
        next(error)

    }
    //res.send("Form submitted");
}   


async function encryptPassword(password) {
    console.log('Encrypting a password for the JWT.')
    salt = await bcrypt.genSalt(10)
    hashedPass = await bcrypt.hash(password, salt)
    console.log("hashedPass: type: " + typeof(hashedPass) + " , fina: l" + hashedPass)
    return hashedPass
  }








