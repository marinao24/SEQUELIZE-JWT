const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController');

router.post('/api/signin', controller.signin);
router.post('/api/signup', controller.signup);

module.exports = router;
