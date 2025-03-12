//Uses a JWT to find a username, pulls that users data from the database.
//Sends the JWT as a response

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
        //Result is a JSON containing user data.
        "user":[{
            "username":user.username,
            "email":user.email,
            "currentGoal":user.currentGoal,

            "attackChoice": user.attackChoice ,
            "attackCustomXp": user.attackCustomXp ,
            "attackCustomGp": user.attackCustomGp ,
            "attackBoost": user.attackBoost ,

            "defenceChoice": user.defenceChoice ,
            "defenceCustomXp": user.defenceCustomXp ,
            "defenceCustomGp": user.defenceCustomGp ,
            "defenceBoost": user.defenceBoost ,

            "strengthChoice": user.strengthChoice ,
            "strengthCustomXp": user.strengthCustomXp ,
            "strengthCustomGp": user.strengthCustomGp ,
            "strengthBoost": user.strengthBoost ,

            "hitpointsChoice": user.hitpointsChoice ,
            "hitpointsCustomXp": user.hitpointsCustomXp ,
            "hitpointsCustomGp": user.hitpointsCustomGp ,
            "hitpointsBoost": user.hitpointsBoost ,

            "rangedChoice": user.rangedChoice ,
            "rangedCustomXp": user.rangedCustomXp ,
            "rangedCustomGp": user.rangedCustomGp ,
            "rangedBoost": user.rangedBoost ,
          
            "prayerChoice": user.prayerChoice ,
            "prayerCustomXp": user.prayerCustomXp ,
            "prayerCustomGp": user.prayerCustomGp ,
            "prayerBoost": user.prayerBoost ,
          
            "magicChoice": user.magicChoice ,
            "magicCustomXp": user.magicCustomXp ,
            "magicCustomGp": user.magicCustomGp ,
            "magicBoost": user.magicBoost ,
          
            "runecraftChoice": user.runecraftChoice ,
            "runecraftCustomXp": user.runecraftCustomXp ,
            "runecraftCustomGp": user.runecraftCustomGp ,
            "runecraftBoost": user.runecraftBoost ,
          
            "constructionChoice": user.constructionChoice ,
            "constructionCustomXp": user.constructionCustomXp ,
            "constructionCustomGp": user.constructionCustomGp ,
            "constructionBoost": user.constructionBoost ,
          
            "agilityChoice": user.agilityChoice ,
            "agilityCustomXp": user.agilityCustomXp ,
            "agilityCustomGp": user.agilityCustomGp ,
            "agilityBoost": user.agilityBoost ,
          
            "herbloreChoice": user.herbloreChoice ,
            "herbloreCustomXp": user.herbloreCustomXp ,
            "herbloreCustomGp": user.herbloreCustomGp ,
            "herbloreBoost": user.herbloreBoost ,
          
            "thievingChoice": user.thievingChoice ,
            "thievingCustomXp": user.thievingCustomXp ,
            "thievingCustomGp": user.thievingCustomGp ,
            "thievingBoost": user.thievingBoost ,
          
            "craftingChoice": user.craftingChoice ,
            "craftingCustomXp": user.craftingCustomXp ,
            "craftingCustomGp": user.craftingCustomGp ,
            "craftingBoost": user.craftingBoost ,
          
            "fletchingChoice": user.fletchingChoice ,
            "fletchingCustomXp": user.fletchingCustomXp ,
            "fletchingCustomGp": user.fletchingCustomGp ,
            "fletchingBoost": user.fletchingBoost ,
          
            "slayerChoice": user.slayerChoice ,
            "slayerCustomXp": user.slayerCustomXp ,
            "slayerCustomGp": user.slayerCustomGp ,
            "slayerBoost": user.slayerBoost ,
          
            "hunterChoice": user.hunterChoice ,
            "hunterCustomXp": user.hunterCustomXp ,
            "hunterCustomGp": user.hunterCustomGp ,
            "hunterBoost": user.hunterBoost ,
          
            "miningChoice": user.miningChoice ,
            "miningCustomXp": user.miningCustomXp ,
            "miningCustomGp": user.miningCustomGp ,
            "miningBoost": user.miningBoost ,
          
            "smithingChoice": user.smithingChoice ,
            "smithingCustomXp": user.smithingCustomXp ,
            "smithingCustomGp": user.smithingCustomGp ,
            "smithingBoost": user.smithingBoost ,
          
            "fishingChoice": user.fishingChoice ,
            "fishingCustomXp": user.fishingCustomXp ,
            "fishingCustomGp": user.fishingCustomGp ,
            "fishingBoost": user.fishingBoost ,
          
            "cookingChoice": user.cookingChoice ,
            "cookingCustomXp": user.cookingCustomXp ,
            "cookingCustomGp": user.cookingCustomGp ,
            "cookingBoost": user.cookingBoost ,
          
            "firemakingChoice": user.firemakingChoice ,
            "firemakingCustomXp": user.firemakingCustomXp ,
            "firemakingCustomGp": user.firemakingCustomGp ,
            "firemakingBoost": user.firemakingBoost ,
          
            "woodcuttingChoice": user.woodcuttingChoice ,
            "woodcuttingCustomXp": user.woodcuttingCustomXp ,
            "woodcuttingCustomGp": user.woodcuttingCustomGp ,
            "woodcuttingBoost": user.woodcuttingBoost ,

            "seedChoice": user.seedChoice,
            "patchesChoice": user.patchesChoice,

        }]
        }
    res.send(jsonUser)
}