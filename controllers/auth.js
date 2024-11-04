//Mongoose for mongodb
const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema} = require('../helpers/validation_schema')

exports.register = async (req, res ) => {
    //console.log(req.body);
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { userEmail: email, userPass: pass } = req.body;

        //Add registration to database.
        //if(!email || !pass) throw createError.BadRequest();
        const result = await authSchema.validateAsync({ userEmail: email, userPass: password })
        console.log(result)
        
        const doesExist = await User.findOne({email: email})
        if(doesExist) throw createError.Conflict(`${email} is already registered`)
        
        //And we can use the destructed data to creat our new user, setting the dbitemname:currentvariablename syntax
        //similar to the destruct above
        const user = new User({email, password: pass})

        const savedUser = await user.save()
        console.log(savedUser)

    } catch(error){
        console.log(error)

    }
    res.send("Form submitted");
}   








