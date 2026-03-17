const express = require('express');
const router = express.Router();

const pokedexController = require('../controllers/pokedex.controller');
const menuController = require('../controllers/menu.controller');
const isAuth = require('../middleware/is-auth');


// Mostrar pokedex
router.get('/pokedex', isAuth, menuController.protegerRuta, pokedexController.getPokedex);

// Mostrar formulario
router.get('/pokedex/new',isAuth, menuController.protegerRuta, pokedexController.getNuevoPokemon);

// Procesar formulario
router.post('/pokedex/new',isAuth, menuController.protegerRuta, pokedexController.postNuevoPokemon);

module.exports = router;