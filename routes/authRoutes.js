const express = require('express');

const router = express.Router();

const { 
    signupValidator,
    loginValidator 
} = require('../utils/validators/authValidator');

const { 
    signup,
    login, 
} = require('../controllers/authController');


router.route('/login').post(loginValidator, login);
router.route('/signup').post(signupValidator, signup);

module.exports = router;