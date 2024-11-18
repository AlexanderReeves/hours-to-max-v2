//Mongoose for mongodb
const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')

//For cookies
const express = require('express');

exports.register = async (req, res ) => {
    //console.log(req.body);
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { username: username, userEmail: email, userPass: password } = req.body;
        //Validation the submission against the registration schema
        console.log('Validating a new user. username: ' + '. email: ' + email + ". password: " + password)
        if(!username || (username.length < 3)){
            res.send('Your username must be at least 3 characters!')
        }
        if(!email){
            res.send('Your email field is blank!')
        }
        if(!password){
            res.send('Your password field is blank!')
        }
        const result = await authSchema.validateAsync({username, email, password});
        console.log(result)
        
        //If that email is used in the db, throw an error
        const emailDoesExist = await User.findOne({email: email})
        if(emailDoesExist){
            throw createError.Conflict(`${email} is already registered`)

        } 
        //If that username is used in the db, throw an error
        const usernameDoesExist = await User.findOne({username: username})
        if(usernameDoesExist) throw createError.Conflict(`${username} is already taken!`)
        
        
        //And we can use the destructed data to creat our new user, setting the syntax is like
        //somedatabaseitemname:currentvariablename
        const user = new User({username, email, password: password})

        const savedUser = await user.save()
        console.log(savedUser)
        console.log('A new user was added to the database! user: ' + savedUser.id)

        //=====================================================
        //Once the user is registered, use jwt helper to create a jwt for them
        const accessToken = await signAccessToken(savedUser.id)
        console.log('Sending the new user a jwt access token.')
        res.cookie('authorization', accessToken)

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
        const result = await authSchema.validateAsync({email,password});
        console.log(result)

        const user = await User.findOne({email: result.email})
        if (!user) throw createError.NotFound("Username/Password was not valid")
        //If user exists, check for valid password via our custom userjs function
        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createError.Unauthorized("Username/Password was not valid")

        //If sign in was okay
        const accessToken = await signAccessToken(user.id)
        
        console.log('sending cookie')
        res.cookie('authorization', accessToken)
        //res.send(accessToken)
    } catch(error){
        if(error.isJoi === true) return next(createError.BadRequest("Joi has rejected your input values!"))
        next(error)

    }
    //res.send("Form submitted");
}   









