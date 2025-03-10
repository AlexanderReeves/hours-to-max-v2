//const mongoose = require('mongoose')
const User = require('../Models/user')
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
    const user = await User.findById(payload.aud)
    if(!user){
        res.status(422).json({'error': `user was not found`})
        return
    }
    jsonUser = {
        "user":[{
            "username":user.username,
            "email":user.email,
            "currentGoal":user.currentGoal,
            "rangedChoice": user.rangedChoice,
            "magicChoice": user.magicChoice , 
            "prayerChoice": user.prayerChoice , 
            "woodcuttingChoice": user.woodcuttingChoice , 
            "runecraftChoice": user.runecraftChoice , 
            "constructionChoice": user.constructionChoice , 
            "agilityChoice": user.agilityChoice , 
            "herbloreChoice": user.herbloreChoice , 
            "thievingChoice": user.thievingChoice , 
            "craftingChoice": user.craftingChoice , 
            "fletchingChoice": user.fletchingChoice , 
            "hunterChoice": user.hunterChoice , 
            "miningChoice": user.miningChoice ,
            "smithingChoice": user.smithingChoice , 
            "fishingChoice": user.fishingChoice , 
            "cookingChoice": user.cookingChoice , 
            "firemakingChoice": user.firemakingChoice , 
            "slayerChoice": user.slayerChoice ,
            "seedChoice": user.seedChoice,
            "patchesChoice": user.patchesChoice
        }]
        }
    res.send(jsonUser)
}