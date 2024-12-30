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
            expiryTime = "60d"
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
      signRefreshToken: (userId, email, username, expiryTime) => {     
        return new Promise((resolve, reject) => {
          const payload = {
            "email": email,
            "username": username,
          }
          //Default expiry time if none provided, though this may be settable above in function name
          if(expiryTime == null){
            expiryTime = "1y"
          }
          const secret = process.env.REFRESH_TOKEN_SECRET
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
            resolve({"refreshToken": token})

          })
        })
      },
      verifyAccessToken: (req, res, next) => {
        console.log("Verifying access token")
        //Find the authorization/jwt from the cookies
        accessToken = getJwtFromCookies(req,"authorization");
        refreshToken = getJwtFromCookies(req,"refreshAuthorization");
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if(err) {
            //Before sending an Unauthorized error, check if there is a refresh token.

            //User was unahtorized. Send Error.
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
      },
      getPayloadFromToken(code){
        result = false
        //Converts a jwt to a payload internally
        console.log("jwt helper is verifying the token....")
        jwt.verify(code, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if(err) {
            return false
          }
          console.log('Successfully read the jwt: ' + JSON.stringify(payload))
          result = payload
        })
        return result
      }
}

function getJwtFromCookies(req,field) {
  //Checks the provided request headers for the specified field
  console.log('Checking for a JWT in cookies!')
  if(req.headers.cookie){
    console.log('Cookies found in request')
    //Finds the auth code from cookies and returns it
    result = cookieParser.parseCookies(req)[field]
    console.log('Cookies result for requested field ' + field + ': ' + result)
    return result
  }else{
    console.log('No cookies found in request')
      return null;
  }
  
}
