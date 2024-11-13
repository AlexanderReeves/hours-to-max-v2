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
        const { userEmail: email, userPass: password } = req.body;

        //Add registration to database.
        //if(!email || !pass) throw createError.BadRequest();
        console.log('VALIDATOR VALUES: ' + email + '   ' + password )
        const result = await authSchema.validateAsync({email,password});
        console.log(result)
        
        const doesExist = await User.findOne({email: email})
        if(doesExist) throw createError.Conflict(`${email} is already registered`)
        
        //And we can use the destructed data to creat our new user, setting the dbitemname:currentvariablename syntax
        //similar to the destruct above
        const user = new User({email, password: password})

        const savedUser = await user.save()
        console.log(savedUser)
        console.log('saved user id = ' + savedUser.id)

        //=====================================================
        const accessToken = await signAccessToken(savedUser.id)
        console.log('sending cookie')
        res.cookie('authorization', accessToken)
        res.send(accessToken)

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
        res.send(accessToken)
    } catch(error){
        if(error.isJoi === true) return next(createError.BadRequest("Joi has rejected your input values!"))
        next(error)

    }
    //res.send("Form submitted");
}   









