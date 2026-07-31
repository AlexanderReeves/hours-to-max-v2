const express = require('express');
const findController = require('../controllers/find')

const router = express.Router();

//These are all the routes that can find things
router.post('/user', findController.findUser);
router.post('/snapshots', findController.findSnapshots);
router.post('/all-snapshots', findController.findAllSnapshots);

module.exports = router;