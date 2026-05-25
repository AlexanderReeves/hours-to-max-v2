const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SnapshotSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  username: { type: String, required: true },
  playerId: { type: String, required: true },
  currentGoal: { type: String, required: true },
  percentOfGoal: { type: Number, required: true },
  entryDate: { type: Date, required: true, default: Date.now }
})

const Snapshot = mongoose.model('snapshot', SnapshotSchema)
module.exports = Snapshot
