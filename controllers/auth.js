//Mongoose for mongodb
//const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')
const {authSchema, loginSchema, emailSchema, passwordSchema} = require('../helpers/validation_schema')
const {signAccessToken,signRefreshToken} = require('../helpers/jwt_helper')
const mailHelper = require('../helpers/mailer')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

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
            if(err.message.includes("pattern")){
             res.status(422).json({'error': "Password must contain a capital, a number, and a special character."})
            }
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
        const registrationToken = await signAccessToken(savedUser.id,email, username, "1h")
        console.log('Sending the new user a jwt access token email' + registrationToken)
        //res.cookie('authorization', accessToken)
        res.send(JSON.stringify({ success: 'Registration email sent!' }))
        //Send the registration email
        mailHelper.registrationEmail(registrationToken,email)

    } catch(error){
        console.log(error)
    }
}   

exports.login = async (req, res, next ) => {
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { userEmail: email, userPass: password } = req.body;
        console.log('Login validation values: ' + email + '   ' + password)

        //Check the inputs are valid
        try{
            const result = await loginSchema.validateAsync({email,password});
            console.log(result)
        }catch (err){
            //If this fails, result remains unchanged from its original declaration
            console.log("Joi Error Message: " + err.message)
            //From here, set a https error code, a message, and return to requester!
            res.status(422).json({'error': "Invalid email/password"})
            //If joi validation fails, end function
            return
        }
        
        const user = await User.findOne({email})
        if(!user){
            res.status(422).json({'error': "Invalid email/password"})
            return
        }

        //If user exists, check for valid password
        const isMatch = await user.isValidPassword(password)
        if(!isMatch){
            res.status(422).json({'error': "Invalid email/password"})
            return
        }

        //Check is the user confirmed their email address already
        //We shouldn't need to send in any params as it will just check the current object
        if(!user.confirmed){
            res.status(422).json({'error': "Please confirm your email address first"})
            return
        }

        //At this stage, the sign in was successful. Generate a jwt.
        const accessToken = await signAccessToken(user.id, user.email, user.username, "1m")
        const refreshToken = await signRefreshToken(user.id, user.email, user.username, "1y")
        //On sign in success, send JST cookie and redirect to home page!
        console.log('Valid sign in. Sending cookie to user.')
        res.cookie('authorization', accessToken)
        res.cookie('refreshAuthorization', refreshToken)
        res.cookie('username', user.username)
        res.cookie('userid', user.id)
        res.status(200).send('Successful sign in!');

    } catch(error){
        //Backup fail case that shouldn't ever run, but if it fails it will show the 
        //default error
        console.log(error)
        next(error)
    }
}   

exports.confirmRegistration = async (req, res, next ) => {
    //Get the JWT which will contain the email that is being activated
    const email = req.payload.email;
    //does not work as string, must be json, also check the user email is not already confirmed
    user = await User.findOne({ email, confirmed: false })
    //user = await User.findOne({ email })


    console.log("Confirming regisration for user: ")
    console.log(user)


    res.resolution = ""
    if(user){
        console.log("There is a match on the unverified email: " + email)
        user.confirmed = true;
        user.save();
        res.resolution = " was successfully registered!"
    }else{
        const user = await User.findOne({ email})
        if(user){
            console.log("There is a match on the already verified email: " + email)
            res.resolution = " is already registered!"
        }else{
            console.log("There is NO match for this email address: " + email)
            res.resolution = " is already registered!"
        }
    }
    next()

}

exports.forgot = async (req, res, next ) => {
    //Get the JWT which will contain the email that is being activated
    const email = req.body.userEmail;
    console.log(email)

    //Check the email address input was okay
    try{
        const result = await emailSchema.validateAsync({email});
        console.log(result)
    }catch (err){
        //If this fails, result remains unchanged from its original declaration
        console.log("Joi Error Message: " + err.message)
        //console.log(Object.getOwnPropertyNames(err))
        //From here, set a https error code, a message, and return to requester!
        res.status(422).json({'error': "Invalid email format"})
        //If joi validation fails, end function
        return
    }

    //does not work as string, must be json, also check the user email is not already confirmed
    const user = await User.findOne({ email })
    console.log(user)
    if(user){
        console.log("There is a match on the unverified email: " + email)
        key = crypto.randomBytes(10).toString('hex')
        console.log("random bytes generated : " + key)
        //Save the users password reset token to the database
        user.resetToken = key;
        currentDateTime = new Date();
        //1 hour link expiry
        // currentDateTime += (60 * 60 * 1000);
        currentDateTime.setHours(currentDateTime.getHours() + 1);
        user.passwordLinkExipry = currentDateTime
        user.save();
        mailHelper.oopsEmail(key, email)
        res.send(JSON.stringify({ success: 'Password reset email sent.' }))
        
    }else{
        console.log("There is NO match on the unverified email: " + email)
        res.status(422).json({'error': "Not a valid email"})
    }
    //next()

}

exports.newpassword = async (req, res, next ) => {
    try{
        //We can destruct the variables here, using : to separate original and new variable name
        const { password: password, confirmPassword:confirmPassword, token: token} = req.body;

        //Check for match
        if(password != confirmPassword){
            res.status(422).json({'error': "Passwords do not match."})
            return
        }

        //Check the password input was okay
        try{
            const result = await passwordSchema.validateAsync({password});
            console.log(result)
        }catch (err){
            //If this fails, result remains unchanged from its original declaration
            console.log("Joi Error Message: " + err.message)
            //console.log(Object.getOwnPropertyNames(err))
            //From here, set a https error code, a message, and return to requester!
            res.status(422).json({'error': "Password must contain a letter, number, symbol and at least 8 characters."})
            //If joi validation fails, end function
            return
        }
        
        //Check the token belongs to a valid user
        if(token){
            console.log("The provided reset token is " + req.query.token)
        }else{
            console.log("No verification token provided");
            res.status(422).json({'error': "No password reset token provided."});
        }

        const user = await User.findOne({resetToken: token})
        //If it fails, return a create Error, and move to the next error middleware in main
        if (!user){
            res.status(422).json({'error': "The password reset token is invalid."});
            return;
        }
        currentDateTime = new Date()
        console.log("current date time" + currentDateTime)
        console.log("expiry date time" + user.passwordLinkExipry)
        if( currentDateTime > user.passwordLinkExipry){
            res.status(422).json({'error': "The password reset token has expired."});
            return;
        }
        user.password = password;
        //Invalidate the current reset token expiry time
        user.passwordLinkExipry = 0;
        try{
            user.save();
        }catch{
            res.status(422).json({'error': "Save was not successful."});
            return
        }
        //If all success
        //On sign in success, send JST cookie and redirect to home page!
        console.log('User password was updated. Signing user in.')
        mailHelper.passwordChangedEmail(user.email)
        const accessToken = await signAccessToken(user.id)
        res.cookie('authorization', accessToken)
        res.status(200).send('Password updated successfully! You can now sign in.');
        //res.render('index')

    } catch(err){
        return false
    }
 
}   

async function encryptPassword(password) {
    console.log('Encrypting a password for the JWT.')
    salt = await bcrypt.genSalt(10)
    hashedPass = await bcrypt.hash(password, salt)
    console.log("hashedPass: type: " + typeof(hashedPass) + " , fina: l" + hashedPass)
    return hashedPass
  }








