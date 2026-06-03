//Uses a JWT to find a username, pulls that users data from the database.
//Sends the JWT as a response

//const mongoose = require('mongoose')
const User = require('../Models/user')
const ChosenTrainingMethod = require('../Models/chosen_training_method');
const Snapshot = require('../Models/snapshot')
//Jwt decrypter
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')


//find/user route
exports.findUser = async (req, res , next) => {
    const { authCode } = req.body;
    // console.log("/find is finding user from jwt via auth code: " + authCode)
    //Get user id from jwt
    payload = getPayloadFromAccessToken(authCode)
    console.log("Found user with id: " + payload.aud)
    if(!payload){
        res.status(422).json({'error': `token was invalid`})
        return
    }
    const user = await User.findById(payload.aud).populate('chosenMethods');
    if(!user){
        res.status(422).json({'error': `user was not found`})
        return
    }
    console.log(user + " was found in the database. Sending user data as json.##############################")
    jsonUser = {
        //Result is a JSON containing user data.
        "user":[{
            "username":user.username,
            "email":user.email,
            "currentGoal":user.currentGoal,
            "sortChoice":user.sortChoice,
            "showCompletedChoice":user.showCompletedChoice,
            "customLevelsString":user.customLevelsString,
            "hoursPerDay": user.hoursPerDay,
            "seedChoice": user.seedChoice,
            "patchesChoice": user.patchesChoice,
            "chosenMethods": user.chosenMethods
        }]
        }
    res.send(jsonUser)
}

exports.findSnapshots = async (req, res , next) => {
    const { authCode, auth, currentGoal, playerId } = req.body;
    const accessToken = auth || authCode;
    if(!accessToken){
        res.status(422).json({ error: 'token was invalid' })
        return
    }

    const payload = getPayloadFromAccessToken(accessToken)
    if(!payload){
        res.status(422).json({ error: 'token was invalid' })
        return
    }

    if(!currentGoal || !playerId){
        res.status(422).json({ error: 'missing required query data' })
        return
    }

    const snapshots = await Snapshot.find({
        email: payload.email,
        currentGoal,
        playerId
    }).sort({ entryDate: 1 })

    res.json({ snapshots })
}
