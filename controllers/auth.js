//Mongoose for mongodb
//const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema, loginSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')
const mailHelper = require('../helpers/mailer')
const bcrypt = require('bcrypt')

exports.register = async (req, res , next) => {
    //Create a Json response for the form to receive
    res.setHeader('Content-Type', 'application/json');
    try{
        //*********Validation of the user details entered
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

        //Check if that is a confirmed email address in the system
        const emailDoesExist = await User.findOne({email: email})
        if(emailDoesExist){
            res.status(422).json({'error': `${email} is already registered`})
            return
        } 
        //Check if the username is available
        const usernameDoesExist = await User.findOne({username: username})
        if(usernameDoesExist){
            res.status(422).json({'error': `Sorry! ${username} is not available.`})
        } 

        //If validation passes, and username/email are available, save the user to the database
        const confirmed = false
        //Destructed data entered to new user with syntax {somedatabaseitemname:currentvariablename}
        const user = new User({username, email, password, confirmed})
        const savedUser = await user.save()
        console.log('A new user was added to the database! user: ' + savedUser)

        //Once the user is registered, send verification email, using JWT to confirm validity
        //const accessToken = await signAccessToken(savedUser.id, email, hashedPass)
        const registrationToken = await signAccessToken(savedUser.id, email, "1h")
        console.log('Sending the new user a jwt access token email' + registrationToken)
        //res.cookie('authorization', accessToken)
        //res.send(JSON.stringify({ success: 'You have been registered!' }))
        //Send the registration email
        mailHelper.registrationEmail(registrationToken)

    } catch(error){
        console.log(error)
    }
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

exports.confirmRegistration = async (req, res, next ) => {
    //Get the JWT which will contain the email that is being activated
    const email = req.payload.email;
    //does not work as string, must be json, also check the user email is not already confirmed
    const emailFound = await User.findOne({ email })
    console.log(emailFound)
    if(emailFound){
        console.log("There is a match on the unverified email: " + email)
    }else{
        console.log("There is NO match on the unverified email: " + email)
    }
    next()

}

async function encryptPassword(password) {
    console.log('Encrypting a password for the JWT.')
    salt = await bcrypt.genSalt(10)
    hashedPass = await bcrypt.hash(password, salt)
    console.log("hashedPass: type: " + typeof(hashedPass) + " , fina: l" + hashedPass)
    return hashedPass
  }








