const express = require('express');
const router = express.Router();

const pokedexController = require('../controllers/pokedex.controller');

//Mostrar pokedex
router.get('/', pokedexController.getPokedex);

//Mostrar formulario
router.get('/new', pokedexController.getNuevoPokemon);

//Procesar formulario
router.post('/new', pokedexController.postNuevoPokemon);

module.exports = router;