//This code works for 2023 for  (1:05:04) Intro to Express Sessions
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const MongoStore = require('connect-mongo')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = MongoStore.create({
  mongoUrl: 'mongodb+srv://reevesalexanderj:nala1234@hours-to-max.4jrpf.mongodb.net/?retryWrites=true&w=majority&appName=hours-to-max',
  collectionName: 'sessions'
})

app.use(session({
  secret: "mynewsecret",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24//?1 day expire
  }
}))

app.get("/", (req, res, next) => {
  // console.log(req.session )
  (req.session.viewCount) ? (req.session.viewCount++) : (req.session.viewCount = 1);//?counts how many user visited this page
  res.send(`You have visited this page ${req.session.viewCount} times`)
})

app.listen(3000, (req, res) => console.log("listening to 3000"))