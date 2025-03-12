//const mongoose = require('mongoose')
const User = require('../Models/user')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')

// route /save/choices
exports.saveChoices = async (req, res , next) => {
    console.log(req.body)
    //Convert received request post values into variables
    const { 
        auth:auth,
        username:username,
        currentGoal: currentGoal,

        attackChoice: attackChoice ,
        attackCustomXp: attackCustomXp ,
        attackCustomGp: attackCustomGp ,
        attackBoost: attackBoost ,

        strengthChoice: strengthChoice ,
        strengthCustomXp: strengthCustomXp ,
        strengthCustomGp: strengthCustomGp ,
        strengthBoost: strengthBoost ,
        
        defenceChoice: defenceChoice ,
        defenceCustomXp: defenceCustomXp ,
        defenceCustomGp: defenceCustomGp ,
        defenceBoost: defenceBoost ,

        hitpointsChoice: hitpointsChoice ,
        hitpointsCustomXp: hitpointsCustomXp ,
        hitpointsCustomGp: hitpointsCustomGp ,
        hitpointsBoost: hitpointsBoost ,

        rangedChoice: rangedChoice ,
        rangedCustomXp: rangedCustomXp ,
        rangedCustomGp: rangedCustomGp ,
        rangedBoost: rangedBoost ,
      
        prayerChoice: prayerChoice ,
        prayerCustomXp: prayerCustomXp ,
        prayerCustomGp: prayerCustomGp ,
        prayerBoost: prayerBoost ,
      
        magicChoice: magicChoice ,
        magicCustomXp: magicCustomXp ,
        magicCustomGp: magicCustomGp ,
        magicBoost: magicBoost ,
      
        runecraftChoice: runecraftChoice ,
        runecraftCustomXp: runecraftCustomXp ,
        runecraftCustomGp: runecraftCustomGp ,
        runecraftBoost: runecraftBoost ,
      
        constructionChoice: constructionChoice ,
        constructionCustomXp: constructionCustomXp ,
        constructionCustomGp: constructionCustomGp ,
        constructionBoost: constructionBoost ,
      
        agilityChoice: agilityChoice ,
        agilityCustomXp: agilityCustomXp ,
        agilityCustomGp: agilityCustomGp ,
        agilityBoost: agilityBoost ,
      
        herbloreChoice: herbloreChoice ,
        herbloreCustomXp: herbloreCustomXp ,
        herbloreCustomGp: herbloreCustomGp ,
        herbloreBoost: herbloreBoost ,
      
        thievingChoice: thievingChoice ,
        thievingCustomXp: thievingCustomXp ,
        thievingCustomGp: thievingCustomGp ,
        thievingBoost: thievingBoost ,
      
        craftingChoice: craftingChoice ,
        craftingCustomXp: craftingCustomXp ,
        craftingCustomGp: craftingCustomGp ,
        craftingBoost: craftingBoost ,
      
        fletchingChoice: fletchingChoice ,
        fletchingCustomXp: fletchingCustomXp ,
        fletchingCustomGp: fletchingCustomGp ,
        fletchingBoost: fletchingBoost ,
      
        slayerChoice: slayerChoice ,
        slayerCustomXp: slayerCustomXp ,
        slayerCustomGp: slayerCustomGp ,
        slayerBoost: slayerBoost ,
      
        hunterChoice: hunterChoice ,
        hunterCustomXp: hunterCustomXp ,
        hunterCustomGp: hunterCustomGp ,
        hunterBoost: hunterBoost ,
      
        miningChoice: miningChoice ,
        miningCustomXp: miningCustomXp ,
        miningCustomGp: miningCustomGp ,
        miningBoost: miningBoost ,
      
        smithingChoice: smithingChoice ,
        smithingCustomXp: smithingCustomXp ,
        smithingCustomGp: smithingCustomGp ,
        smithingBoost: smithingBoost ,
      
        fishingChoice: fishingChoice ,
        fishingCustomXp: fishingCustomXp ,
        fishingCustomGp: fishingCustomGp ,
        fishingBoost: fishingBoost ,
      
        cookingChoice: cookingChoice ,
        cookingCustomXp: cookingCustomXp ,
        cookingCustomGp: cookingCustomGp ,
        cookingBoost: cookingBoost ,
      
        firemakingChoice: firemakingChoice ,
        firemakingCustomXp: firemakingCustomXp ,
        firemakingCustomGp: firemakingCustomGp ,
        firemakingBoost: firemakingBoost ,
      
        woodcuttingChoice: woodcuttingChoice ,
        woodcuttingCustomXp: woodcuttingCustomXp ,
        woodcuttingCustomGp: woodcuttingCustomGp ,
        woodcuttingBoost: woodcuttingBoost ,

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
    //Save to model (left) based on post data (right)
    
    user.username = username,
    user.currentGoal = currentGoal,

    user.attackChoice= attackChoice ,
    user.attackCustomXp= attackCustomXp ,
    user.attackCustomGp= attackCustomGp ,
    user.attackBoost= attackBoost ,

    user.strengthChoice= strengthChoice ,
    user.strengthCustomXp= strengthCustomXp ,
    user.strengthCustomGp= strengthCustomGp ,
    user.strengthBoost= strengthBoost ,

    user.defenceChoice= defenceChoice ,
    user.defenceCustomXp= defenceCustomXp ,
    user.defenceCustomGp= defenceCustomGp ,
    user.defenceBoost= defenceBoost ,

    user.hitpointsChoice= hitpointsChoice ,
    user.hitpointsCustomXp= hitpointsCustomXp ,
    user.hitpointsCustomGp= hitpointsCustomGp ,
    user.hitpointsBoost= hitpointsBoost ,

    user.rangedChoice= rangedChoice ,
    user.rangedCustomXp= rangedCustomXp ,
    user.rangedCustomGp= rangedCustomGp ,
    user.rangedBoost= rangedBoost ,
  
    user.prayerChoice= prayerChoice ,
    user.prayerCustomXp= prayerCustomXp ,
    user.prayerCustomGp= prayerCustomGp ,
    user.prayerBoost= prayerBoost ,
  
    user.magicChoice= magicChoice ,
    user.magicCustomXp= magicCustomXp ,
    user.magicCustomGp= magicCustomGp ,
    user.magicBoost= magicBoost ,
  
    user.runecraftChoice= runecraftChoice ,
    user.runecraftCustomXp= runecraftCustomXp ,
    user.runecraftCustomGp= runecraftCustomGp ,
    user.runecraftBoost= runecraftBoost ,
  
    user.constructionChoice= constructionChoice ,
    user.constructionCustomXp= constructionCustomXp ,
    user.constructionCustomGp= constructionCustomGp ,
    user.constructionBoost= constructionBoost ,
  
    user.agilityChoice= agilityChoice ,
    user.agilityCustomXp= agilityCustomXp ,
    user.agilityCustomGp= agilityCustomGp ,
    user.agilityBoost= agilityBoost ,
  
    user.herbloreChoice= herbloreChoice ,
    user.herbloreCustomXp= herbloreCustomXp ,
    user.herbloreCustomGp= herbloreCustomGp ,
    user.herbloreBoost= herbloreBoost ,
  
    user.thievingChoice= thievingChoice ,
    user.thievingCustomXp= thievingCustomXp ,
    user.thievingCustomGp= thievingCustomGp ,
    user.thievingBoost= thievingBoost ,
  
    user.craftingChoice= craftingChoice ,
    user.craftingCustomXp= craftingCustomXp ,
    user.craftingCustomGp= craftingCustomGp ,
    user.craftingBoost= craftingBoost ,
  
    user.fletchingChoice= fletchingChoice ,
    user.fletchingCustomXp= fletchingCustomXp ,
    user.fletchingCustomGp= fletchingCustomGp ,
    user.fletchingBoost= fletchingBoost ,
  
    user.slayerChoice= slayerChoice ,
    user.slayerCustomXp= slayerCustomXp ,
    user.slayerCustomGp= slayerCustomGp ,
    user.slayerBoost= slayerBoost ,
  
    user.hunterChoice= hunterChoice ,
    user.hunterCustomXp= hunterCustomXp ,
    user.hunterCustomGp= hunterCustomGp ,
    user.hunterBoost= hunterBoost ,
  
    user.miningChoice= miningChoice ,
    user.miningCustomXp= miningCustomXp ,
    user.miningCustomGp= miningCustomGp ,
    user.miningBoost= miningBoost ,
  
    user.smithingChoice= smithingChoice ,
    user.smithingCustomXp= smithingCustomXp ,
    user.smithingCustomGp= smithingCustomGp ,
    user.smithingBoost= smithingBoost ,
  
    user.fishingChoice= fishingChoice ,
    user.fishingCustomXp= fishingCustomXp ,
    user.fishingCustomGp= fishingCustomGp ,
    user.fishingBoost= fishingBoost ,
  
    user.cookingChoice= cookingChoice ,
    user.cookingCustomXp= cookingCustomXp ,
    user.cookingCustomGp= cookingCustomGp ,
    user.cookingBoost= cookingBoost ,
  
    user.firemakingChoice= firemakingChoice ,
    user.firemakingCustomXp= firemakingCustomXp ,
    user.iremakingCustomGp= firemakingCustomGp ,
    user.firemakingBoost= firemakingBoost ,
  
    user.woodcuttingChoice= woodcuttingChoice ,
    user.woodcuttingCustomXp= woodcuttingCustomXp ,
    user.woodcuttingCustomGp= woodcuttingCustomGp ,
    user.woodcuttingBoost= woodcuttingBoost ,

    user.seedChoice= seedChoice,
    user.farmingPatches= patchesChoice,
    
    user.save();
    res.send("success")
}