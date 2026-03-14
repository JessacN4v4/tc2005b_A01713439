const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipo.controller');
const menuController = require('../controllers/menu.controller');

//Seleccion de equipo
router.get('/equipo', menuController.protegerRuta, equipoController.getEquipo);

//Detalle del equipo
router.get('/equipo/detalle', menuController.protegerRuta, equipoController.getDetalle);

//Recibir equipo desde frontend
router.post('/equipo/actualizar', menuController.protegerRuta, equipoController.postActualizar);

module.exports = router;