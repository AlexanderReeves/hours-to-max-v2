//const mongoose = require('mongoose')
const User = require('../Models/user')
const Snapshot = require('../Models/snapshot')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')
const {saveChoicesSchema, saveProgressSchema} = require('../helpers/validation_schema')
const ChosenTrainingMethod = require('../Models/chosen_training_method');


//Comes from the save.js route
//router.post('/choices', saveController.saveChoices);


// route POST /save/choices
exports.saveChoices = async (req, res , next) => {
    try {
        console.log("Received save choices request with body:", req.body, "ATTEMPTING TO PROCESS DATA FOR SAVING");
        const { 
            auth,
            username,
            currentGoal,
            sortChoice,
            showCompletedChoice,
            customLevelsString,
            hoursPerDay,
            chosenCape,
            trainingMethods
        } = req.body;

            console.log("TRY STARTED SUCCESSFULLY: ")
        // 1. Validate choices AND the nested training methods array together
        try {
            
            const result = await saveChoicesSchema.validateAsync({
                username,
                currentGoal,
                sortChoice,
                showCompletedChoice,
                customLevelsString,
                hoursPerDay,
                chosenCape,
                trainingMethods // Validated cleanly by the updated Joi schema (includes farming)
            }, {warnings: true});

        } catch(err) {
            console.log("Save choices validation failed:", err);
            // Return Joi's error message to the client for debugging validation failures
            const message = err && err.message ? err.message : 'One or more inputs is invalid';
            return res.status(422).json({ 'error': message });
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

        if (trainingMethods && Array.isArray(trainingMethods) && trainingMethods.length > 35) {
            return res.status(422).json({ error: `You may save a maximum of 34 standard training methods plus the farming method.` });
        }

        // 2. Update primary user document values
        user.username = username;
        user.currentGoal = currentGoal;
        user.sortChoice = sortChoice;
        user.showCompletedChoice = showCompletedChoice;
        user.customLevelsString = customLevelsString;
        user.hoursPerDay = isNaN(parseFloat(hoursPerDay)) || parseFloat(hoursPerDay) <= 0 ? 1 : parseFloat(hoursPerDay);
        user.chosenCape = chosenCape;
        
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
                profitPerXp: method.profitPerXp,
                skill: method.skill,
                xpPerHour: method.xpPerHour,
                name: method.name,
                startLevel: method.startLevel,
                goalLevel: method.goalLevel
            }));

            // Handle multiple document inserts seamlessly
            await ChosenTrainingMethod.insertMany(methodsToInsert);
        }

        res.status(200).json({ success: true, message: "success" });

    } catch (dbError) {
        console.error("Database save error:", dbError);
        next(dbError)
    }
}

//SNAPSHOT SAVING LOGIC ####################################
exports.saveProgress = async (req, res, next) => {
    try {
        //console.log(req.body)
        const { auth, currentGoal, percentOfGoal, playerId } = req.body;

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
        const snapshotUserId = user.id
        const snapshotEmail = payload.email || user.email
        const snapshotUsername = payload.username || user.username

        try {
            await saveProgressSchema.validateAsync({
                userId: snapshotUserId,
                email: snapshotEmail,
                username: snapshotUsername,
                currentGoal,
                percentOfGoal,
                playerId: playerIdValue
            }, { warnings: true });
        } catch (err) {
            //console.log("Save progress validation failed: " + err.message)
            res.status(422).json({ error: "Could not save progress: invalid input." })
            return
        }

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const recentSnapshot = await Snapshot.findOne({
            email: snapshotEmail,
            currentGoal,
            playerId: playerIdValue,
            entryDate: { $gte: sevenDaysAgo }
        }).sort({ entryDate: -1 })

        if (recentSnapshot) {
            res.status(422).json({ error: "A progress snapshot for this character and goal was already saved within the last 7 days." })
            return
        }

        const snapshot = new Snapshot({
            userId: snapshotUserId,
            email: snapshotEmail,
            username: snapshotUsername,
            playerId: playerIdValue,
            currentGoal: currentGoal,
            percentOfGoal: parseFloat(percentOfGoal),
            entryDate: new Date()
        })

        await snapshot.save()
        res.json({ success: true, snapshotId: snapshot.id })
    } catch (error) {
        next(error)
    }
}
//END SNAPSHOT SAVING LOGIC #############################

exports.deleteSnapshot = async (req, res, next) => {
    try {
        const { auth, authCode, snapshotId } = req.body;
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

        if(!snapshotId){
            res.status(422).json({ error: 'missing snapshot id' })
            return
        }

        if(!/^[a-fA-F0-9]{24}$/.test(snapshotId)){
            res.status(422).json({ error: 'invalid snapshot id' })
            return
        }

        const deletedSnapshot = await Snapshot.findOneAndDelete({
            _id: snapshotId,
            email: payload.email
        })

        if(!deletedSnapshot){
            res.status(404).json({ error: 'snapshot was not found' })
            return
        }

        res.json({ success: true })
    } catch (error) {
        next(error)
    }
}
