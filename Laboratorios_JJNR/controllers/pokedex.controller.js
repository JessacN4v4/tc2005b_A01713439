const Pokemon = require('../models/pokemons');

//GET /pokedex
exports.getPokedex = (request, response, next) => {
    const pokemons = Pokemon.fetchAll();
    response.render('pokedex', { pokemons });
};

//GET /pokedex/new
exports.getNuevoPokemon = (request, response, next) => {
    response.render('formulario');
};

//POST /pokedex/new
exports.postNuevoPokemon = (request, response, next) => {
    const { nombre, descripcion, tipo, imagen, debilidades, fortalezas } = request.body;

    if (!nombre || !descripcion || !tipo || !imagen || !debilidades || !fortalezas) {
        return response.status(400).send("Todos los campos son obligatorios");
    }

    const nuevoPokemon = new Pokemon(
        nombre,
        descripcion,
        tipo,
        imagen,
        debilidades,
        fortalezas
    );

    nuevoPokemon.save();

    response.redirect('/pokedex');
};