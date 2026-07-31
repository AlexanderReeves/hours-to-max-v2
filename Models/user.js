const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')



const UserSchema = new Schema({

email: { type: String, required: true, lowercase: true, unique: true,},
  confirmed: {type: Boolean,required: true, default: false, },
  username:{ type: String, required: true, unique: false,  },
  currentGoal:{ type: String, required: true, unique: false, default: "max"},
  sortChoice: { type: Number, required: false, default: 0 },
  showCompletedChoice: { type: Boolean, required: false, default: true },
  customLevelsString: { type: String, required: false, default: "" },
  hoursPerDay: { type: Number, required: false, default: 1 },
  chosenCape: { type: String, required: false, default: "Max_cape.webp" },
  password: { type: String, required: false,  },  
  passwordLinkExipry: { type: Date, required: false,  },
  resetToken: { type: String, required: false },
  
}, {
  // CRITICAL: This allows virtual fields like 'chosenMethods' to 
  // be included when you pass user data to the frontend via JSON
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

// EXPLICIT LINK: Virtual populate to fetch multiple rows from the training methods table
UserSchema.virtual('chosenMethods', {
  ref: 'ChosenTrainingMethod',    // CHANGE THIS to match your training methods Model name
  localField: '_id',              // The _id field on this User schema
  foreignField: 'userId'          // The field on the training methods table that holds the User's ID
})

UserSchema.pre('save', async function (next){
  //Only hash the password if this is a new object
  if(this.isNew || this.isModified('password')){
    try{
      console.log('Password encryption triggered:')
      console.log(this.email, this.password)
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(this.password, salt)
      this.password = hashedPass
      console.log(hashedPass)
    } catch(error){
      console.log("Bad pass middleware")
      return next(error)
    }
  }else{
    console.log("Skipping pre hash of password")
  }
  return next()
})

UserSchema.post('save', async function (next){
  try{
    console.log(UserSchema);
    console.log('New user has been saved.')
    
  } catch(error){
    next(error)
  }
})

//Login check valid password including its encryption
UserSchema.methods.isValidPassword = async function (password) {
  try{
    const result = await bcrypt.compare(password, this.password)
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