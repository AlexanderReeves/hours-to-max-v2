//Use joi to make sure out data is valid before it hits the database
const Joi = require('joi')


//For registration
const authSchema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
    .regex(/[ -~]*[a-z][ -~]*/)//lowercase
    .regex(/[ -~]*[A-Z][ -~]*/)//uppercase
    .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)//special character
    .regex(/[ -~]*[0-9][ -~]*/)//number
    .min(8).max(20)
    .required(),
  })

//For sign in
const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().min(7).max(40).required(),
    password: Joi.string().min(2).required(),
  })

const emailSchema = Joi.object({
  email: Joi.string().email().lowercase().min(7).max(40).required(),
})

const passwordSchema = Joi.object({
  password: Joi.string()
  .regex(/[ -~]*[a-z][ -~]*/)//lowercase
  .regex(/[ -~]*[A-Z][ -~]*/)//uppercase
  .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)//special character
  .regex(/[ -~]*[0-9][ -~]*/)//number
  .min(8).max(20)
  .required(),
})

//For choices saving

//UPDATED BY AI##########
const saveChoicesSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  currentGoal: Joi.string().min(1).max(50).required(),
  chosenCape: Joi.string().min(2).max(50).required(),
  sortChoice: Joi.number().integer().min(0).max(3),
  showCompletedChoice: Joi.boolean(),
  customLevelsString: Joi.string().allow(''),
  hoursPerDay: Joi.number().min(0.01).max(24).default(1),
  
  // NEW: Validate the incoming trainingMethods array right here
  // trainingMethods array includes all skills including farming with xpPerHour=seedChoice and profitPerXp=numPatches
  trainingMethods: Joi.array().max(35).items(
    Joi.object({
      name: Joi.string().min(2).max(30).required(),
      skill: Joi.string().min(2).max(20).required(),
      xpPerHour: Joi.number().min(-1000).max(13000000).required(),
      profitPerXp: Joi.number().min(-1000).max(1000).required(),
      startLevel: Joi.number().integer().min(1).max(99).required(),
      goalLevel: Joi.number().integer().min(1).max(99).required()
    })
  ).optional() // marked as optional in case a user clears out all methods
})

// Maximum of 35 methods includes the special farming method that is always appended client-side.


//###### END OF AI UPDATE

const saveProgressSchema = Joi.object({
  userId: Joi.string().required(),
  email: Joi.string().email().lowercase().min(7).max(40).required(),
  username: Joi.string().min(2).max(20).required(),
  currentGoal: Joi.string().min(1).max(50).required(),
  percentOfGoal: Joi.number().min(0).max(100).required(),
  playerId: Joi.string().min(1).max(100).required()
})

const saveTrainingMethodSchema = Joi.object({
    userId: Joi.string().required(),
    email: Joi.string().email().lowercase().min(7).max(40).required(),
    username: Joi.string().min(2).max(20).required(),
    profitPerXp: Joi.number().min(-1000).max(1000).required(),
    skill: Joi.string().min(2).max(20).required(),
    xpPerHour: Joi.number().min(0).max(13000000).required(),
    name: Joi.string().min(2).max(30).required()
  ,
  startLevel: Joi.number().integer().min(1).max(99).required(),
  goalLevel: Joi.number().integer().min(1).max(99).required()
})

//It's likely these above two schema's could be consolidated using a Joi functio
//Hapi Joi has a class extender but I couldn't find one for normal Joi

//Create a copy of the auth schema, but making the username optional for sign in
//as we already have the email
//const userLoginSchema = authSchema.optionalKeys("username");

module.exports = {
  authSchema,
  loginSchema,
  emailSchema,
  passwordSchema,
  saveChoicesSchema, // Exported with the new array handling nested inside
  saveProgressSchema,
  saveTrainingMethodSchema
}