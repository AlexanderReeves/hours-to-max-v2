const express = require('express');
const authController = require('../controllers/auth')

const router = express.Router();

//These are all places a form can submit
router.post('/register', authController.register );
router.post('/login', authController.login );
router.post('/forgot', authController.forgot );
router.post('/newpassword', authController.newpassword );


module.exports = router;