//Mongoose for mongodb
const mongoose = require('mongoose')
const User = require('../Models/user')
const createError = require('http-errors')

exports.register = async (req, res ) => {
    console.log(req.body);

    try{
        const email = req.body.userEmail;
        const pass = req.body.userPass;
        const passConfirm = req.body.userPassConfirm;
        //The above can be written into a single line as shown here
        //"Destructuring"
        //const {email, pass, passConfirm} = req.body;

        //Add registration to database.
        const db = mongoose.connect('mongodb+srv://reevesalexanderj:nala1234@hours-to-max.4jrpf.mongodb.net/?retryWrites=true&w=majority&appName=hours-to-max')
        console.log(email)
        console.log(pass)

        if(!email || !pass) throw createError.BadRequest();

        else{
            const doesExist = await User.findOne({email: email})
            if (doesExist) {
                console.log('User exists already with this email')
            }else{
                console.log('User does not exist')
            }
        }
        User.create({email: email});

    } catch(error){
        console.log(error)

    }
    
    res.send("Form submitted");
}   








