const express = require('express');
const { loginFamily, signupFamily } = require('../controllers/familyController');
const router = express.Router();

// LOGIN

router.post('/enter', loginFamily)

// SIGNUP

router.post('/create', signupFamily)

module.exports = router;