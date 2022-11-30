const express = require('express');
const { loginFamily, signupFamily } = require('../controllers/familyController');
const router = express.Router();

// LOGIN

router.post('/login', loginFamily)

// SIGNUP

router.post('/signup', signupFamily)

module.exports = router;