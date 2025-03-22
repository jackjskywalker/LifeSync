const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login); 
router.put('/updateProfile', authController.updateProfile);

module.exports = router;