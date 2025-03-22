const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rutas para autenticación
router.post('/auth/registrar', authController.createUser);
router.post('/auth/login', authController.login);

module.exports = router;
