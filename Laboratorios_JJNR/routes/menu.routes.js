const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu.controller');
const isAuth = require('../middleware/is-auth');


//Proteger todas las rutas del menu
router.get('/menu', isAuth, menuController.protegerRuta, menuController.getMenu);

//Cambiar fondo (POST)
router.post('/menu/fondo', isAuth, menuController.protegerRuta, menuController.postCambiarFondo);

module.exports = router;
