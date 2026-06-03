const express = require('express');
const saveController = require('../controllers/save')

const router = express.Router();

//These the routes which can be used to save data from the client side.
// The /choices route is for saving the user's selected training methods and their details,
//  while the /progress route is for saving the user's current progress in the game.
//  Both routes will receive POST requests with JSON or form data (with params) from the client side, 
// which will then be processed by the corresponding controller functions in saveController.
router.post('/choices', saveController.saveChoices);
router.post('/progress', saveController.saveProgress);

module.exports = router;