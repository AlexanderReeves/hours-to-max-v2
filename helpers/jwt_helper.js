var jwt = require('jsonwebtoken');
const createError = require('http-errors')


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {
          }
          const secret = process.env.ACCESS_TOKEN_SECRET
          const options = {
            expiresIn: "1h",
            issuer: 'hourstomax.com',
            audience: userId,
          }
          console.log(secret + "SSSSSSSSSSSSSSSSSECRETTTTTTTTTTTT")
          //We should handle errors if we had an error while generating a jwt
          jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              reject(createError.InternalServerError("Sorry! There was an internal error that happened in the server!"))
            }
            resolve(token)
            resolve({"accessToken": token})

          })
        })
      },
      verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if(err) {
            return next(createError.Unauthorized())
          }
          req.payload = payload
          next()
        })
      }
}