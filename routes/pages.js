const express = require('express');
const { verifyAccessToken } = require('../helpers/jwt_helper');
const { verifyRegistrationToken } = require('../helpers/jwt_helper');
const cookieParser = require('../helpers/cookie_parser');
const { confirmRegistration } = require('../controllers/auth');
const User = require('../Models/user')
const createError = require('http-errors')
const {getPayloadFromAccessToken} = require('../helpers/jwt_helper')

//Log the number of page loads to the count.txt file
const fs = require('node:fs');
function CountPageRequests(){
    //Load total page reads
    count = 0
    readData = fs.readFileSync('./count.txt').toString()
    readData = parseInt(readData)
    readData ++
    readData = readData.toString()
    console.log("Total index page requests to date : " + readData)
    //Save updated tally to file
    fs.writeFile('count.txt', readData, 'utf-8', err2 => {
    if (err2) {
        console.log(err2)
    }
    })
}

//Router will direct web requests and results
const router = express.Router();

// Index page rendering, will have differences if the user is signed in.
router.get('/', verifyAccessToken,(req, res) => {
    console.log("ATTEMPTING TO LOAD INDEX PAGE")
    CountPageRequests();
    username = "Player"
    userSignedIn = false

      var skills = {
        "attack": {
            "skillName":"attack",
            "trainingMethods":[
                {"method":"Custom Training Method"},
                {"method":"Trained during slayer!"}]
        },
        "strength": {
            "skillName":"strength",
            "trainingMethods":[
                {"method":"Custom Training Method"},
                {"method":"Trained during slayer!"}]
        },
        "defence": {
            "skillName":"defence",
            "trainingMethods":[
                {"method":"Custom Training Method"},
                {"method":"Trained during slayer!"}]
        },
        "ranged": {
            "skillName":"ranged",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"90kph Cannon Ice Trolls"},
                {"method":"130kph Pest Control"},
                {"method":"140kph NMZ Venator Bow"},
                {"method":"675kph Chinning Monkeys"},
                {"method":"710kph Chinning Monkeys (red)"},
                {"method":"850kph Chinning Monkeys (black)"}]
        },
        "prayer": {
            "skillName":"prayer",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"50kph Big Bones"},
                {"method":"250kph Baby Dragon Bones"},
                {"method":"437kph Wyrm Bones"},
                {"method":"600kph Dragon Bones"},
                {"method":"800kph Lava Dragon Bones"},
                {"method":"1250kph Sup. Dragon Bones"}]
        },
        "magic": {
            "skillName":"magic",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"78kph Cast High Level Alchemy"},
                {"method":"150kph Cast Plank Make"},
                {"method":"150kph Casting String Jewellery"},
                {"method":"175kph Stun Alching"},
                {"method":"380kph Ice Barrage Manical Monkeys"}]
        },
        "runecraft": {
            "skillName":"runecraft",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"35kph Blood Runes"},
                {"method":"60kph Solo Lava Runes"},
                {"method":"65kph Guardians Of The Rift"},
                {"method":"70kph Ourania Altar"},
                {"method":"80kph Arceeus Library"},
                {"method":"100kph Steam Runes"}]
        },
        "construction": {
            "skillName":"construction",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"190kph Mahogany Homes"},
                {"method":"400kph Mythical Capes"},
                {"method":"450kph Oak Larders"},
                {"method":"500kph Oak Dungeon Doors"},
                {"method":"580kph Teak Benches"},
                {"method":"850kph Mahogany Tables"},
                {"method":"1000kph Gnome Benches"}]
        },
        "hitpoints": {
            "skillName":"hitpoints",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"Trained Passively Via Combat!"}]
        },
        "agility": {
            "skillName":"agility",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"45kph Seers Rooftop"},
                {"method":"50kph Wilderness Agility"},
                {"method":"50kph Pollivneach Rooftop"},
                {"method":"55kph Relleka Rooftop"},
                {"method":"65kph Ardougne Rooftop"},
                {"method":"65kph Priffdinas Rooftop"},
                {"method":"90kph Hallowed Sepulchre"}]
        },
        "herblore": {
            "skillName":"herblore",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"110kph Cast Degrime Torstol"},
                {"method":"170kph Making Irit Tar"},
                {"method":"210kph Making Combat potion"},
                {"method":"400kph Make Magic Potion"},
                {"method":"500kph Make Ancient Brew"}]
        },
        "thieving": {
            "skillName":"thieving",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"110kph Master Farmers"},
                {"method":"140kph Elves"},
                {"method":"150kph Vyres"},
                {"method":"210kph Ardy Knights"},
                {"method":"240kph Blackjacking"},
                {"method":"260kph Rogues Castle Chests"},
                {"method":"265kph Pyramid Plunder"}]
        },
        "crafting": {
            "skillName":"crafting",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"150kph Dragonstone Bracelets"},
                {"method":"220kph Cutting Rubies"},
                {"method":"270kph Cutting Diamonds"},
                {"method":"360kph Cutting Dragonstones"},
                {"method":"415kph Crafting Black D'hide Bodies"}]
        },
        "fletching": {
            "skillName":"fletching",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"1900kph Mithril Darts"},
                {"method":"2250kph Adamant Darts"},
                {"method":"2500kph Rune Darts"},
                {"method":"3000kph Amethyst Darts"},
                {"method":"4000kph Dragon Darts"}]
        },
        "slayer": {
            "skillName":"slayer",
            "trainingMethods":[
                {"method":"Custom Training Method"}]
        },
        "hunter": {
            "skillName":"hunter",
            "trainingMethods":[
                {"method":"Custom Training Method", },
                {"method":"80kph Kebbits"},
                {"method":"115kph Red Chinchompas"},
                {"method":"125kph Black Salamanders"},
                {"method":"160kph Black Chinchompas"},
                {"method":"175kph Hunters Rumors"}]
        },
        "mining": {
            "skillName":"mining",
            "trainingMethods":[
                {"method":"25kph Crashed Stars", },
                {"method":"50kph Iron Ore"},
                {"method":"60kph Motherlode Mine"},
                {"method":"69kph Blast Mine"},
                {"method":"70kph Gem Rocks"},
                {"method":"75kph Zalcano"},
                {"method":"78kph Solo Volcanic Mine"},
                {"method":"85kph Volcanic Mine"}]
        },
        "smithing": {
            "skillName":"smithing",
            "trainingMethods":[
                {"method":"200kph Giants Foundry", },
                {"method":"250kph Anvil Smithing"},
                {"method":"350kph Blast Furnace"}]
        },
        "fishing": {
            "skillName":"fishing",
            "trainingMethods":[
                {"method":"40kph Fly Fishing", },
                {"method":"50kph Barbarian Fishing"},
                {"method":"75kph Tempoross"},
                {"method":"80kph Drift Net Fishing"}]
        },
        "cooking": {
            "skillName":"cooking",
            "trainingMethods":[
                {"method":"150kph Lobster", },
                {"method":"250kph Karambwans"},
                {"method":"300kph Angler Fish"},
                {"method":"450kph Bake Summer Pie Spell"},
                {"method":"900kph 1t Karambawans"}]
        },
        "firemaking": {
            "skillName":"firemaking",
            "trainingMethods":[
                {"method":"250kph Mahogany Logs", },
                {"method":"275kph Yew Logs"},
                {"method":"290kph Wintertodt"},
                {"method":"400kph Magic Log"},
                {"method":"450kph Redwood logs"}]
        },
        "woodcutting": {
            "skillName":"woodcutting",
            "trainingMethods":[
                {"method":"68kph Cutting Redwood Trees", },
                {"method":"75kph Cutting Blisterwood Trees"},
                {"method":"90kph Forrestry at Yews"},
                {"method":"90kph Cutting Teak Trees"},
                {"method":"100kph Cutting Scullicep Trees"}]
        }
      };

    if(req.verifiedUser){
        username = req.payload.username
        console.log("The page was requested from verified user " + username)
        if(username){
            userSignedIn = true
        }else{
            console.log("JWT cookies were found to be invalid, removing them")
            res.clearCookie("authorization");
        }
    }
    res.render('index', { signedin: userSignedIn, username: username, allSkills: skills, title: "test"});
});


router.get('/logout',(req, res) => {
    console.log('Signing out user')
    res.clearCookie("authorization");
    res.clearCookie("refreshAuthorization");
    res.redirect('/');
});

router.get('/register', (req, res) => {
    //The registration page shouldn't be seen if the user is currently signed in

    //Prevent the registration page from caching
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    //If the user already signed in, and has a JWT, they should be redirected to the index home page
    userSignedIn = false
    if(req.headers.cookie){
        //If we found a cookie, check that it belongs to a valid user
        // Use the cookie paser to chech the req for a field called authorization
        const userJwt = cookieParser.parseCookies(req)['authorization']
        username = cookieParser.parseCookies(req)['username']
        if(userJwt){
            userSignedIn = true
        }
        //If the jwt token found was invalid, user is not logged in
        if(!username){
            userSignedIn = false
        }
    }
    //If the user is already signed in, go to home page
    if(userSignedIn){
        res.redirect('/');
    }else{
        //If not signed in, show a fresh registration page
        res.render('register');
    }
});


router.get('/verify', verifyRegistrationToken, confirmRegistration,(req, res) => {
    //Did the user account verification request contain a token?
    console.log('Verification status: ' + res.resolution)
    if(req.query.token){
        console.log("The provided registration token is :" + req.query.token)
    }else{
        console.log("No verification token provided");
    }
    verifiedEmail = JSON.stringify(req.payload.email)
    verifiedEmail = verifiedEmail.replace(/(['"])/g, "")
    res.render('verify', {data: verifiedEmail, response: res.resolution});
});

router.get('/newpassword', async(req, res, next) => {
    //Did the reset password request contain a token?

    if(req.query.token){
        console.log("The provided reset token is " + req.query.token)
    }else{
        console.log("No verification token provided");
    }

    const user = await User.findOne({resetToken: req.query.token})
    console.log(user)
    //If it fails, return a create Error, and move to the next error middleware in main
    if (!user) return next(createError.NotFound("Invalid reset token"))
    //Otherwise render the pass reset page
    res.render('newpass', {data: req.payload});

});


router.get('/login', (req, res) => {
    console.log("LOADING LOGIN PAGE")
    //The login shouldn't be seen if the user is currently signed in
    //If the back button is pressed after sign in, a cached version of the login page appears.

    //Prevent the login page from caching
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    //If the user already signed in, and has a JWT, they should be redirected to the index home page
    userSignedIn = false
    if(req.headers.cookie){
        //If we found a cookie, check that it belongs to a valid user
        // Use the cookie paser to chech the req for a field called authorization
        const userJwt = cookieParser.parseCookies(req)['authorization']
        username = cookieParser.parseCookies(req)['username']
        console.log("USERNAME IS " + username)
        if(userJwt){
            userSignedIn = true
        }
        //If the jwt token found was invalid, user is not logged in
        if(!username){
            userSignedIn = false
        }
    }
    //If the user is already signed in, go to home page
    if(userSignedIn){
        console.log("REDIRECTING TO INDEX")
        res.redirect('/');
    }else{
        //If not signed in, show a fresh login page
        res.render('login');
    }
});

router.get('/forgot', (req, res) => {
    //This page can render for both signed in and non signed in users
    res.render('forgot');
});

router.get('/projects', (req, res) => {
    //This page can render for both signed in and non signed in users
    res.render('projects');
});

router.get('/author', (req, res) => {
    //This page can render for both signed in and non signed in users
    res.render('author');
});

router.get('/download-file', (req, res) => {
    res.download("./public/download/AlexanderReevesResume2025.pdf")
});
module.exports = router;

