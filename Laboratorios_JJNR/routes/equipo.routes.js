const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipo.controller');

//Seleccion de equipo
router.get('/', equipoController.getEquipo);

//Detalle del equipo
router.get('/detalle', equipoController.getDetalle);

//Recibir equipo desde frontend
router.post('/actualizar', equipoController.postActualizar);

module.exports = router;