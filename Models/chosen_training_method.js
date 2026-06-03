const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChosenTrainingMethodSchema = new Schema({
//Save the users ID, email, and username against the training method chosen
    userId: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    username: { type: String, required: true },

  //Method specific fields
    levelsBoosted: { type: Number, required: true },
    profitPerXp: { type: Number, required: true },
    skill: { type: String, required: true },
    xpPerHour: { type: Number, required: true },
    name: { type: String, required: true }
})

const ChosenTrainingMethod = mongoose.model('ChosenTrainingMethod', ChosenTrainingMethodSchema)
module.exports = ChosenTrainingMethod
