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
const saveChoicesSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  currentGoal: Joi.string().min(2).max(20).required(),

  attackChoice: Joi.number().integer().min(0).max(99),
  attackCustomXp: Joi.number().integer().min(0).max(13000000),
  attackCustomGp: Joi.number().integer().min(-1000).max(1000),
  attackBoost: Joi.number().integer().min(0).max(5),

  strengthChoice: Joi.number().integer().min(0).max(99),
  strengthCustomXp: Joi.number().integer().min(0).max(13000000),
  strengthCustomGp: Joi.number().integer().min(-1000).max(1000),
  strengthBoost: Joi.number().integer().min(0).max(5),

  defenceChoice: Joi.number().integer().min(0).max(99),
  defenceCustomXp: Joi.number().integer().min(0).max(13000000),
  defenceCustomGp: Joi.number().integer().min(-1000).max(1000),
  defenceBoost: Joi.number().integer().min(0).max(5),

  hitpointsChoice: Joi.number().integer().min(0).max(99),
  hitpointsCustomXp: Joi.number().integer().min(0).max(13000000),
  hitpointsCustomGp: Joi.number().integer().min(-1000).max(1000),
  hitpointsBoost: Joi.number().integer().min(0).max(5),

  rangedChoice: Joi.number().integer().min(0).max(99),
  rangedCustomXp: Joi.number().integer().min(0).max(13000000),
  rangedCustomGp: Joi.number().integer().min(-1000).max(1000),
  rangedBoost: Joi.number().integer().min(0).max(5),

  prayerChoice: Joi.number().integer().min(0).max(99),
  prayerCustomXp: Joi.number().integer().min(0).max(13000000),
  prayerCustomGp: Joi.number().integer().min(-1000).max(1000),
  prayerBoost: Joi.number().integer().min(0).max(5),

  magicChoice: Joi.number().integer().min(0).max(99),
  magicCustomXp: Joi.number().integer().min(0).max(13000000),
  magicCustomGp: Joi.number().integer().min(-1000).max(1000),
  magicBoost: Joi.number().integer().min(0).max(5),

  runecraftChoice: Joi.number().integer().min(0).max(99),
  runecraftCustomXp: Joi.number().integer().min(0).max(13000000),
  runecraftCustomGp: Joi.number().integer().min(-1000).max(1000),
  runecraftBoost: Joi.number().integer().min(0).max(5),

  constructionChoice: Joi.number().integer().min(0).max(99),
  constructionCustomXp: Joi.number().integer().min(0).max(13000000),
  constructionCustomGp: Joi.number().integer().min(-1000).max(1000),
  constructionBoost: Joi.number().integer().min(0).max(5),

  agilityChoice: Joi.number().integer().min(0).max(99),
  agilityCustomXp: Joi.number().integer().min(0).max(13000000),
  agilityCustomGp: Joi.number().integer().min(-1000).max(1000),
  agilityBoost: Joi.number().integer().min(0).max(5),

  herbloreChoice: Joi.number().integer().min(0).max(99),
  herbloreCustomXp: Joi.number().integer().min(0).max(13000000),
  herbloreCustomGp: Joi.number().integer().min(-1000).max(1000),
  herbloreBoost: Joi.number().integer().min(0).max(5),

  thievingChoice: Joi.number().integer().min(0).max(99),
  thievingCustomXp: Joi.number().integer().min(0).max(13000000),
  thievingCustomGp: Joi.number().integer().min(-1000).max(1000),
  thievingBoost: Joi.number().integer().min(0).max(5),

  craftingChoice: Joi.number().integer().min(0).max(99),
  craftingCustomXp: Joi.number().integer().min(0).max(13000000),
  craftingCustomGp: Joi.number().integer().min(-1000).max(1000),
  craftingBoost: Joi.number().integer().min(0).max(5),

  fletchingChoice: Joi.number().integer().min(0).max(99),
  fletchingCustomXp: Joi.number().integer().min(0).max(13000000),
  fletchingCustomGp: Joi.number().integer().min(-1000).max(1000),
  fletchingBoost: Joi.number().integer().min(0).max(5),

  slayerChoice: Joi.number().integer().min(0).max(99),
  slayerCustomXp: Joi.number().integer().min(0).max(13000000),
  slayerCustomGp: Joi.number().integer().min(-1000).max(1000),
  slayerBoost: Joi.number().integer().min(0).max(5),

  hunterChoice: Joi.number().integer().min(0).max(99),
  hunterCustomXp: Joi.number().integer().min(0).max(13000000),
  hunterCustomGp: Joi.number().integer().min(-1000).max(1000),
  hunterBoost: Joi.number().integer().min(0).max(5),

  miningChoice: Joi.number().integer().min(0).max(99),
  miningCustomXp: Joi.number().integer().min(0).max(13000000),
  miningCustomGp: Joi.number().integer().min(-1000).max(1000),
  miningBoost: Joi.number().integer().min(0).max(5),

  smithingChoice: Joi.number().integer().min(0).max(99),
  smithingCustomXp: Joi.number().integer().min(0).max(13000000),
  smithingCustomGp: Joi.number().integer().min(-1000).max(1000),
  smithingBoost: Joi.number().integer().min(0).max(5),

  fishingChoice: Joi.number().integer().min(0).max(99),
  fishingCustomXp: Joi.number().integer().min(0).max(13000000),
  fishingCustomGp: Joi.number().integer().min(-1000).max(1000),
  fishingBoost: Joi.number().integer().min(0).max(5),

  cookingChoice: Joi.number().integer().min(0).max(99),
  cookingCustomXp: Joi.number().integer().min(0).max(13000000),
  cookingCustomGp: Joi.number().integer().min(-1000).max(1000),
  cookingBoost: Joi.number().integer().min(0).max(5),

  firemakingChoice: Joi.number().integer().min(0).max(99),
  firemakingCustomXp: Joi.number().integer().min(0).max(13000000),
  firemakingCustomGp: Joi.number().integer().min(-1000).max(1000),
  firemakingBoost: Joi.number().integer().min(0).max(5),

  woodcuttingChoice: Joi.number().integer().min(0).max(99),
  woodcuttingCustomXp: Joi.number().integer().min(0).max(13000000),
  woodcuttingCustomGp: Joi.number().integer().min(-1000).max(1000),
  woodcuttingBoost: Joi.number().integer().min(0).max(5),
  
  seedChoice: Joi.number().integer().min(0).max(99),
  farmingPatches: Joi.number().integer().min(0).max(99),
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
    saveChoicesSchema
  }