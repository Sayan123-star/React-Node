// conecting to express and connecting router though express
const express = require('express');
// Connecting to the controller files
const { signup, login } = require('../controller/user.controller');
const router = express.Router();
// Posting the router and exporting them
router.post('/register', signup)
router.post('/login', login)

module.exports = router;