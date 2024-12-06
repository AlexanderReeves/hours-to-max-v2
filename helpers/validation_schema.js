//Use joi to make sure out data is valid before it hits the database
const Joi = require('joi')


//For registration
const authSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
  })

//For sign in
const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
  })

const emailSchema = Joi.object({
  email: Joi.string().email().lowercase().required()
})

const passwordSchema = Joi.object({
  password: Joi.string().min(2).required(),
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
    passwordSchema
  }