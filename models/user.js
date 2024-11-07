const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
})

UserSchema.pre('save', async function (next){
  try{
    console.log('New user requested to be saved. Password being encrypted.')
    const salt = await bcrypt.genSalt(10)
    console.log(this.email, this.password)
    const hashedPass = await bcrypt.hash(this.password, salt)
    this.password = hashedPass
    //exit middleware
    next()
  } catch(error){
    next(error)
  }
})

UserSchema.post('save', async function (next){
  try{
    console.log('New user has been saved.')
    
  } catch(error){
    next(error)
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User