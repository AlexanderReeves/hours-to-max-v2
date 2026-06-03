//const mongoose = require('mongoose')
const User = require('../Models/user')
const Snapshot = require('../Models/snapshot')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')
const {saveChoicesSchema, saveProgressSchema} = require('../helpers/validation_schema')
const ChosenTrainingMethod = require('../Models/chosen_training_method');


//Comes from the save.js route
//router.post('/choices', saveController.saveChoices);

        // ### single users table data to save ###
        // auth:auth,
        // username:username,
        // currentGoal: currentGoal,
        // sortChoice: sortChoice,
        // showCompletedChoice: showCompletedChoice,
        // customLevelsString: customLevelsString,
        // hoursPerDay: hoursPerDay ,
        // seedChoice: seedChoice,
        // patchesChoice: farmingPatches
        //### multiple training methods data to save ###
        // trainingMethods: levelsBoosted, name, profitPerXp, skill, xpPerHour

// route POST /save/choices
exports.saveChoices = async (req, res , next) => {
    console.log("Received save choices request with body:", req.body, "ATTEMPTING TO PROCESS DATA FOR SAVING");
    const { 
        auth,
        username,
        currentGoal,
        sortChoice,
        showCompletedChoice,
        customLevelsString,
        hoursPerDay,
        seedChoice,
        patchesChoice: farmingPatches,
        trainingMethods
    } = req.body;

        console.log("TRY STARTED SUCCESSFULLY: ")
    // 1. Validate choices AND the nested training methods array together
    try {
        
        result = await saveChoicesSchema.validateAsync({
            username,
            currentGoal,
            sortChoice,
            showCompletedChoice,
            customLevelsString,
            hoursPerDay,
            seedChoice,
            farmingPatches,
            trainingMethods // Validated cleanly by the updated Joi schema
        }, {warnings: true});

    } catch(err) {
        console.log("Save choices validation failed: " + err.message)
        return res.status(422).json({'error': "Could not save: One or more inputs is invalid"})
    }
    
    // Check the request had valid auth token
    const payload = getPayloadFromAccessToken(auth) 
    if(!payload){
        return res.status(422).json({'error': `token was invalid`})
    }

    const user = await User.findById(payload.aud)
    if(!user){
        return res.status(422).json({'error': `user was not found`})
    }

    try {
        // 2. Update primary user document values
        user.username = username;
        user.currentGoal = currentGoal;
        user.sortChoice = sortChoice;
        user.showCompletedChoice = showCompletedChoice;
        user.customLevelsString = customLevelsString;
        user.hoursPerDay = isNaN(parseFloat(hoursPerDay)) || parseFloat(hoursPerDay) <= 0 ? 1 : parseFloat(hoursPerDay);
        
        await user.save();

        // 3. Clear existing methods for this specific user to handle updates/removals cleanly
        await ChosenTrainingMethod.deleteMany({ userId: user._id });
        console.log(`Cleared existing training methods for user ${user.username} (ID: ${user._id}) to prepare for new saves.`);

        // 4. Map and save the new training rows using values verified from the database user record
        if (trainingMethods && Array.isArray(trainingMethods) && trainingMethods.length > 0) {
            
            const methodsToInsert = trainingMethods.map(method => ({
                userId: user._id.toString(),
                email: user.email,         // Sourced securely from your verified database user doc
                username: user.username,   // Sourced securely from your verified database user doc
                levelsBoosted: method.levelsBoosted,
                profitPerXp: method.profitPerXp,
                skill: method.skill,
                xpPerHour: method.xpPerHour,
                name: method.name
            }));

            // Handle multiple document inserts seamlessly
            await ChosenTrainingMethod.insertMany(methodsToInsert);
        }

        res.status(200).json({ success: true, message: "success" });

    } catch (dbError) {
        console.error("Database save error:", dbError);
        res.status(500).json({ error: "An error occurred while trying to save your data." });
    }
}

//SNAPSHOT SAVING LOGIC ####################################
exports.saveProgress = async (req, res, next) => {
    //console.log(req.body)
    const { auth, currentGoal, percentOfGoal, playerId } = req.body;

    try {
        await saveProgressSchema.validateAsync({ currentGoal, percentOfGoal, playerId }, { warnings: true });
    } catch (err) {
        //console.log("Save progress validation failed: " + err.message)
        res.status(422).json({ error: "Could not save progress: invalid input." })
        return
    }

    const payload = getPayloadFromAccessToken(auth)
    if(!payload){
        res.status(422).json({ error: "token was invalid" })
        return
    }

    const user = await User.findById(payload.aud)
    if(!user){
        res.status(422).json({ error: "user was not found" })
        return
    }



    const playerIdValue = playerId || user.username
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentSnapshot = await Snapshot.findOne({
        email: payload.email,
        currentGoal,
        playerId: playerIdValue,
        entryDate: { $gte: sevenDaysAgo }
    }).sort({ entryDate: -1 })

    if (recentSnapshot) {
        res.status(422).json({ error: "A progress snapshot for this character and goal was already saved within the last 7 days." })
        return
    }

    const snapshot = new Snapshot({
        userId: user.id,
        email: payload.email || user.email,
        username: payload.username || user.username,
        playerId: playerIdValue,
        currentGoal: currentGoal,
        percentOfGoal: parseFloat(percentOfGoal),
        entryDate: new Date()
    })

    await snapshot.save()
    res.json({ success: true, snapshotId: snapshot.id })
}
//END SNAPSHOT SAVING LOGIC #############################
