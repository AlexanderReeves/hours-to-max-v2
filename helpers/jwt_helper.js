var jwt = require('jsonwebtoken');
const createError = require('http-errors')
//Our jwt is stored in cookies, so we need to use the helper to parse it
const cookieParser = require('../helpers/cookie_parser')



module.exports = {
    signAccessToken: (userId, email, username, expiryTime) => {     
        return new Promise((resolve, reject) => {
          const payload = {
            "email": email,
            "username": username,
          }
          //Default expiry time if none provided, though this may be settable above in function name
          if(expiryTime == null){
            expiryTime = "1h"
          }
          const secret = process.env.ACCESS_TOKEN_SECRET
          const options = {
            expiresIn: expiryTime,
            issuer: 'hourstomax.com',
            audience: userId,
          }
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
        console.log("Verifying access token")
        accessToken = getJwtFromCookies(req);
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if(err) {
            return next(createError.Unauthorized())
          }
          req.payload = payload
          next()
        })
      },
      verifyRegistrationToken: (req, res, next) => {
        console.log("Verifying registration token")
        accessToken = req.query.token;
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if(err) {
            return next(createError.Unauthorized())
          }
          console.log("PPPPPPAYLOAD" +   JSON.stringify(payload))
          req.payload = payload
          next()
        })
      }
}

function getJwtFromCookies(req) {
  console.log('Checking for a JWT in cookies!')
  if(req.headers.cookie){
    console.log('Cookies found in request')
    authToken = cookieParser.parseCookies(req)['authorization']
    console.log('Auth token in cookies is : ' + authToken)
    return authToken
  }else{
    console.log('No cookies found in request')
      return null;
  }
  
}

function getEmailAddressFromJwt(){

}

