const express = require('express');
const router = express.Router();

const pokedexController = require('../controllers/pokedex.controller');
const menuController = require('../controllers/menu.controller');
const isAuth = require('../middleware/is-auth');
const upload = require('../utils/upload');

router.get('/pokedex', isAuth, menuController.protegerRuta, pokedexController.getPokedex);
router.get('/pokedex/new', isAuth, menuController.protegerRuta, pokedexController.getNuevoPokemon);
router.post('/pokedex/new', isAuth, menuController.protegerRuta, upload.single('imagen'), pokedexController.postNuevoPokemon);

module.exports = router;
