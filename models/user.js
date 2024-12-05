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
  confirmed: {
    type: Boolean,
    retuired: true,
    default: false,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  resetToken: {
    type: String,
    required: false
  }
})

UserSchema.pre('save', async function (next){
  try{
    //WE are hasing earlier, in the JWT helper instead so we no longer hash on this page
    // console.log('New user requested to be saved. Password being encrypted.')
    // const salt = await bcrypt.genSalt(10)
    // console.log(this.email, this.password)
    // const hashedPass = await bcrypt.hash(this.password, salt)
    // this.password = hashedPass
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

//Login check valid password including its encryption
UserSchema.methods.isValidPassword = async function (password) {
  try{
    //return as boolean
    return await bcrypt.compare(password, this.password)
  } catch (error){
    //Use you just use default error messaging if it's not part of a middleware
    throw error
  }
}

const User = mongoose.model('user', UserSchema)
module.exports = User