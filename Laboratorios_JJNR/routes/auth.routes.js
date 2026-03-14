const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

//Mostrar formulario de login
router.get('/login', authController.getLogin);

//Procesar login
router.post('/login', authController.postLogin);

//Logout
router.get('/logout', authController.logout);

module.exports = router;