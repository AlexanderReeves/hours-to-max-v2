const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')



const UserSchema = new Schema({

  email: { type: String, required: true, lowercase: true, unique: true,},
  confirmed: {type: Boolean,required: true, default: false, },
  username:{ type: String, required: true, unique: false,  },
  currentGoal:{ type: String, required: true, unique: false, default: "max"},
  
  password: { type: String, required: false,  },  
  passwordLinkExipry: { type: Date, required: false,  },
  resetToken: { type: String, required: false  },

  attackChoice: { type: Number, required: false  },
  attackCustomXp: { type: Number, required: false  },
  attackCustomGp: { type: Number, required: false  },
  attackBoost: { type: Number, required: false  },

  strengthChoice: { type: Number, required: false  },
  strengthCustomXp: { type: Number, required: false  },
  strengthCustomGp: { type: Number, required: false  },
  strengthBoost: { type: Number, required: false  },

  defenceChoice: { type: Number, required: false  },
  defenceCustomXp: { type: Number, required: false  },
  defenceCustomGp: { type: Number, required: false  },
  defenceBoost: { type: Number, required: false  },

  hitpointsChoice: { type: Number, required: false  },
  hitpointsCustomXp: { type: Number, required: false  },
  hitpointsCustomGp: { type: Number, required: false  },
  hitpointsBoost: { type: Number, required: false  },

  rangedChoice: { type: Number, required: false  },
  rangedCustomXp: { type: Number, required: false  },
  rangedCustomGp: { type: Number, required: false  },
  rangedBoost: { type: Number, required: false  },

  prayerChoice: { type: Number, required: false  },
  prayerCustomXp: { type: Number, required: false  },
  prayerCustomGp: { type: Number, required: false  },
  prayerBoost: { type: Number, required: false  },

  magicChoice: { type: Number, required: false  },
  magicCustomXp: { type: Number, required: false  },
  magicCustomGp: { type: Number, required: false  },
  magicBoost: { type: Number, required: false  },

  runecraftChoice: { type: Number, required: false  },
  runecraftCustomXp: { type: Number, required: false  },
  runecraftCustomGp: { type: Number, required: false  },
  runecraftBoost: { type: Number, required: false  },

  constructionChoice: { type: Number, required: false  },
  constructionCustomXp: { type: Number, required: false  },
  constructionCustomGp: { type: Number, required: false  },
  constructionBoost: { type: Number, required: false  },

  agilityChoice: { type: Number, required: false  },
  agilityCustomXp: { type: Number, required: false  },
  agilityCustomGp: { type: Number, required: false  },
  agilityBoost: { type: Number, required: false  },

  herbloreChoice: { type: Number, required: false  },
  herbloreCustomXp: { type: Number, required: false  },
  herbloreCustomGp: { type: Number, required: false  },
  herbloreBoost: { type: Number, required: false  },

  thievingChoice: { type: Number, required: false  },
  thievingCustomXp: { type: Number, required: false  },
  thievingCustomGp: { type: Number, required: false  },
  thievingBoost: { type: Number, required: false  },

  craftingChoice: { type: Number, required: false  },
  craftingCustomXp: { type: Number, required: false  },
  craftingCustomGp: { type: Number, required: false  },
  craftingBoost: { type: Number, required: false  },

  fletchingChoice: { type: Number, required: false  },
  fletchingCustomXp: { type: Number, required: false  },
  fletchingCustomGp: { type: Number, required: false  },
  fletchingBoost: { type: Number, required: false  },

  slayerChoice: { type: Number, required: false  },
  slayerCustomXp: { type: Number, required: false  },
  slayerCustomGp: { type: Number, required: false  },
  slayerBoost: { type: Number, required: false  },

  hunterChoice: { type: Number, required: false  },
  hunterCustomXp: { type: Number, required: false  },
  hunterCustomGp: { type: Number, required: false  },
  hunterBoost: { type: Number, required: false  },

  miningChoice: { type: Number, required: false  },
  miningCustomXp: { type: Number, required: false  },
  miningCustomGp: { type: Number, required: false  },
  miningBoost: { type: Number, required: false  },

  smithingChoice: { type: Number, required: false  },
  smithingCustomXp: { type: Number, required: false  },
  smithingCustomGp: { type: Number, required: false  },
  smithingBoost: { type: Number, required: false  },

  fishingChoice: { type: Number, required: false  },
  fishingCustomXp: { type: Number, required: false  },
  fishingCustomGp: { type: Number, required: false  },
  fishingBoost: { type: Number, required: false  },

  cookingChoice: { type: Number, required: false  },
  cookingCustomXp: { type: Number, required: false  },
  cookingCustomGp: { type: Number, required: false  },
  cookingBoost: { type: Number, required: false  },

  firemakingChoice: { type: Number, required: false  },
  firemakingCustomXp: { type: Number, required: false  },
  firemakingCustomGp: { type: Number, required: false  },
  firemakingBoost: { type: Number, required: false  },

  woodcuttingChoice: { type: Number, required: false  },
  woodcuttingCustomXp: { type: Number, required: false  },
  woodcuttingCustomGp: { type: Number, required: false  },
  woodcuttingBoost: { type: Number, required: false  },
  
  seedChoice: { type: Number, required: false  },
  farmingPatches: { type: Number, required: false  }
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