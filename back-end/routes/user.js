const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const passwordController = require('../middleware/validate-password');

router.post('/signup', passwordController, userController.signup);
router.post('/login', userController.login);

module.exports = router;
