const express = require('express');
const router = express.Router();

const pokedexController = require('../controllers/pokedex.controller');
const menuController = require('../controllers/menu.controller'); // para proteger rutas

// Mostrar pokedex
router.get('/pokedex', menuController.protegerRuta, pokedexController.getPokedex);

// Mostrar formulario
router.get('/pokedex/new', menuController.protegerRuta, pokedexController.getNuevoPokemon);

// Procesar formulario
router.post('/pokedex/new', menuController.protegerRuta, pokedexController.postNuevoPokemon);

module.exports = router;