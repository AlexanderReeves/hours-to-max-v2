//This one is built into Node so does not need an install
const crypto = require('crypto')

//Or just generate two keys from a website like this:
// https://randomkeygen.com/ as long as they are 256 bit

//For a 256 byte key, we need 32 bits
//access token key
const accessTokenKey = crypto.randomBytes(32).toString('hex')
//refresh token key
const refreshTokenKey = crypto.randomBytes(32).toString('hex')

console.table({accessTokenKey,refreshTokenKey})