const express = require('express');
const saveController = require('../controllers/save')

const router = express.Router();

//These are all the routes that can find things
router.post('/choices', saveController.saveChoices);

module.exports = router;