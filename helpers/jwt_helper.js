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