//const mongoose = require('mongoose')
const User = require('../Models/user')

exports.findUser = async (req, res , next) => {
    const { userid } = req.body;
    console.log("/find is finding user " + userid)
    const user = await User.findById(userid)
    if(!user){
        res.status(422).json({'error': `${userid} was not found`})
        return
    }
    console.log('Found user ' + userid)
    jsonUser = {
        "user":[{"username":user.username, "email":user.email}]
        }
    res.send(jsonUser)
}