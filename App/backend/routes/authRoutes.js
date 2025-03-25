const express = require('express');
const { register, login, updateProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT

const router = express.Router();

router.post('/register', register);
router.post('/login', login); 
router.put('/updateProfile', authenticate, updateProfile);

module.exports = router;