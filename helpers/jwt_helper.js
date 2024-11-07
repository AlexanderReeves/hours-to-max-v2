var jwt = require('jsonwebtoken');
const createError = require('http-errors')


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {name: 'Some Payload Text'}
          const secret = process.env.ACCESS_TOKEN_SECRET
          const options = {
          }
          console.log(secret + "SSSSSSSSSSSSSSSSSECRETTTTTTTTTTTT")
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
          })
        })
      }
}