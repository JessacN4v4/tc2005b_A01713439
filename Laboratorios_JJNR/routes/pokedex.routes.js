const express = require('express');
const router = express.Router();
const pokemons = require('./pokemons.data');

router.get('/', (request, response, next) => {
    response.render('pokedex', { pokemons });
});

router.get('/new', (request, response, next) => {
    response.render('formulario');
});

router.post('/new', (request, response, next) => {
    const { nombre, descripcion, tipo, imagen, debilidades, fortalezas } = request.body;

    if (!nombre || !descripcion || !tipo || !imagen || !debilidades || !fortalezas) {
        return response.status(400).send("Todos los campos son obligatorios");
    }

    pokemons.push({ nombre, descripcion, tipo, imagen, debilidades, fortalezas });

    response.redirect('/pokedex');
});


module.exports = router;