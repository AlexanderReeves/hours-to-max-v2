var jwt = require('jsonwebtoken');
const createError = require('http-errors')
//Our jwt is stored in cookies, so we need to use the helper to parse it
const cookieParser = require('../helpers/cookie_parser')



module.exports = {
    //Both of these functions provide external access to the non exported versions
    signAccessToken: (userId, email, username, expiryTime) => {
      //Creates access token for cookies using jwt package
        return SignAccessToken(userId, email, username, expiryTime)
    },
    signRefreshToken: (userId, email, username, expiryTime) => {
        //created refresh token for cookies using jwt package 
        return SignRefreshToken(userId,email, username, expiryTime)
    },
    verifyAccessToken: (req, res, next) => {
        console.log("TOKEN VERIFICATION HAS STARTED")
        //Find the authorization/jwt from the cookies
        accessToken = getJwtFromCookies(req,"authorization");
        refreshToken = getJwtFromCookies(req,"refreshAuthorization");

        if(!accessToken){
          console.log("NO VERIFICATION TOKEN WAS FOUND, USER IS NOT SIGNED IN")
          return next()
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
          console.log("JWT is checking the vailidity of the access token.")
          if(err) {
            console.log("RESULT: INVALID ACCESS TOKEN");
            //The access token was invalid
            //If there is no refresh token, create error
            if(!refreshToken){
              console.log("JWT helper found no refresh code")
              // return next(createError.Unauthorized())
              req.verifiedUser = false
              return next()
            }
            //If refresh token is invalid, create error
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
              if(err) {
                console.log("JWT helper found an invalid refresh code")
                // return next(createError.Unauthorized())
                req.verifiedUser = false
                res.clearCookie("authorization");
                res.clearCookie("refreshAuthorization");
                return next()
              }else{
                console.log("Refresh code was valid. Generating new auth and refresh code.")
                payload = GetPayloadFromRefreshToken(refreshToken)
                console.log("payload aud: " + payload.aud)
                console.log("payload emai: " + payload.email)
                console.log("payload username: " + payload.username)

                newAccessToken = await SignAccessToken(payload.aud, payload.email, payload.username, "365d")
                newRefreshToken = await SignRefreshToken(payload.aud, payload.email, payload.username)
                accessToken = newAccessToken
                refreshToken = newRefreshToken

                res.cookie('authorization', newAccessToken)
                res.cookie('refreshAuthorization', newRefreshToken)
                res.cookie('username', payload.username)
                res.cookie('userid', payload.aud)
              }
            })
            
          }else{
            console.log("JWT helper found a valid refresh token");
            req.verifiedUser = true
            req.payload = payload
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
      getPayloadFromAccessToken(code){
        return GetPayloadFromAccessToken(code)
      }
}

function getJwtFromCookies(req,field) {
  //Checks the provided request headers for the specified field
  console.log('GetJWTFromCookies:')
  if(req.headers.cookie){
    console.log(field + ' jwt cookies found in request.')
    //Finds the auth code from cookies and returns it
    result = cookieParser.parseCookies(req)[field]
    //console.log('Cookies result for requested field ' + field + ': ' + result)
    return result
  }else{
    console.log(field + ' jwt cookies NOT found in request.')
      return null;
  }
  
}

function GetPayloadFromAccessToken(code){
  result = false
  //Converts a jwt to a payload internally
  console.log("jwt helper is getting the payload from the access token...")
  jwt.verify(code, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if(err) {
      return false
    }
    console.log('Successfully read the access jwt: ' + JSON.stringify(payload))
    result = payload
  })
  return result
}

function GetPayloadFromRefreshToken(code){
  result = false
  //Converts a jwt to a payload internally
  console.log("jwt helper is getting the payload from the refresh token...")
  jwt.verify(code, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if(err) {
      return false
    }
    console.log('Successfully read the refresh jwt: ' + JSON.stringify(payload))
    result = payload
  })
  return result
}

async function SignAccessToken (userId, email, username, expiryTime){     
  return new Promise((resolve, reject) => {
    const payload = {
      "email": email,
      "username": username,
    }
    // //Default expiry time if none provided, though this may be settable above in function name
    // if(expiryTime == null){
    //   expiryTime = "60d"
    // }
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: "356d",
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
}

async function SignRefreshToken (userId, email, username, expiryTime) {     
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
}


