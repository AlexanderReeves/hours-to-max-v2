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
        "user":[{
            "username":user.username,
            "email":user.email,
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