//const mongoose = require('mongoose')
const User = require('../Models/user')

// route /save/choices
exports.saveChoices = async (req, res , next) => {
    console.log(req.body)
    const { 
        userid:userid,
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
    console.log("/find is finding user " + userid)
    const user = await User.findById(userid)
    if(!user){
        res.status(422).json({'error': `${userid} was not found`})
        return
    }
    console.log('Found user ' + userid)
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