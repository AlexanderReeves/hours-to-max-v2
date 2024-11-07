//Mongoose for mongodb
const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')

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
        res.send(accessToken)

    } catch(error){
        console.log(error)

    }
    //res.send("Form submitted");
}   








