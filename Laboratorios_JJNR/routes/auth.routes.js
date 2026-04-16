const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const isAuth = require('../middleware/is-auth');

//Mostrar formulario de login
router.get('/login', authController.getLogin);

//Procesar login
router.post('/login', authController.postLogin);

//Logout
router.get('/logout', authController.logout);

//Cambiar contraseña (requiere sesión activa)
router.get('/cambiar-password', isAuth, authController.getCambiarPassword);
router.post('/cambiar-password', isAuth, authController.postCambiarPassword);

module.exports = router;