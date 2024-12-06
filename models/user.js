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
  //Only hash the password if this is a new object
  if(this.isNew || this.isModified('password')){
    try{
      console.log('New user requested to be saved. Password being encrypted.')
      console.log(this.email, this.password)
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(this.password, salt)
      this.password = hashedPass
    } catch(error){
      console.log("Bad pass middleware")
      next(error)
    }
  }else{
    console.log("Skipping pre hash of password")
  }
  next()
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
    result = await bcrypt.compare(password, this.password)
    //return await bcrypt.compare(password, this.password)
    console.log(result)
    return result
    
  } catch (error){
    //Use you just use default error messaging if it's not part of a middleware
    throw error
  }
  console.log("no errors...")
  next()
}

const User = mongoose.model('user', UserSchema)
module.exports = User