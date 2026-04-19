const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipo.controller');
const menuController = require('../controllers/menu.controller');
const isAuth = require('../middleware/is-auth');


//Seleccion de equipo
router.get('/equipo', isAuth, menuController.protegerRuta, equipoController.getEquipo);

//Detalle del equipo
router.get('/equipo/detalle', isAuth, menuController.protegerRuta, equipoController.getDetalle);

//Descargar PDF del equipo
router.get('/equipo/pdf', isAuth, equipoController.getPDF);

//Limpiar equipo y volver al menú
router.post('/equipo/limpiar', isAuth, equipoController.postLimpiar);

//Recibir equipo desde frontend
router.post('/equipo/actualizar', isAuth, menuController.protegerRuta, equipoController.postActualizar);

module.exports = router;