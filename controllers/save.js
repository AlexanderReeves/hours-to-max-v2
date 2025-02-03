//const mongoose = require('mongoose')
const User = require('../Models/user')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')

// route /save/choices
exports.saveChoices = async (req, res , next) => {
    console.log(req.body)
    const { 
        auth:auth,
        username:username,
        rangedChoice: rangedChoice,
        magicChoice: magicChoice , 
        prayerChoice: prayerChoice , 
        woodcuttingChoice: woodcuttingChoice , 
        runecraftChoice: runecraftChoice , 
        constructionChoice: constructionChoice , 
        agilityChoice: agilityChoice , 
        herbloreChoice: herbloreChoice , 
        thievingChoice: thievingChoice , 
        craftingChoice: craftingChoice , 
        fletchingChoice: fletchingChoice , 
        hunterChoice: hunterChoice , 
        miningChoice: miningChoice ,
        smithingChoice: smithingChoice , 
        fishingChoice: fishingChoice , 
        cookingChoice: cookingChoice , 
        firemakingChoice: firemakingChoice , 
        slayerChoice: slayerChoice ,
        seedChoice: seedChoice,
        patchesChoice: patchesChoice
    } = req.body;
    //Check the request had valid auth code
    payload = getPayloadFromAccessToken(auth) //wil return false if not found
    //Or it can crash here if an invalid access token runs that is in the process of being refreshed.
    //WE need an escape here for invalid tokens
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
    user.username = username,
    user.rangedChoice = rangedChoice;
    user.magicChoice= magicChoice , 
    user.prayerChoice= prayerChoice , 
    user.woodcuttingChoice= woodcuttingChoice , 
    user.runecraftChoice= runecraftChoice , 
    user.constructionChoice= constructionChoice , 
    user.agilityChoice= agilityChoice , 
    user.herbloreChoice= herbloreChoice , 
    user.thievingChoice= thievingChoice , 
    user.craftingChoice= craftingChoice , 
    user.fletchingChoice= fletchingChoice , 
    user.hunterChoice= hunterChoice , 
    user.miningChoice= miningChoice ,
    user.smithingChoice= smithingChoice , 
    user.fishingChoice= fishingChoice , 
    user.cookingChoice= cookingChoice , 
    user.firemakingChoice= firemakingChoice , 
    user.seedChoice= seedChoice,
    user.farmingPatches= patchesChoice,
    user.slayerChoice = slayerChoice
    user.save();
    res.send("success")
}