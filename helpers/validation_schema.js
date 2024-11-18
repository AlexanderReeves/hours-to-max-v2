//Use joi to make sure out data is valid before it hits the database
const Joi = require('joi')

const authSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
  })
  
  module.exports = {
    authSchema,
  }