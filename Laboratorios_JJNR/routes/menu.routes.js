const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu.controller');

//Proteger todas las rutas del menu
router.get('/menu', menuController.protegerRuta, menuController.getMenu);

//Cambiar fondo (POST)
router.post('/menu/fondo', menuController.protegerRuta, menuController.postCambiarFondo);

module.exports = router;
