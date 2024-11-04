//Use joi to make sure out data is valid before it hits the database
const Joi = require('joi')
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
})

module.export = {
    authSchema
}