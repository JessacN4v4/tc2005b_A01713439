const Pokemon = require('../models/pokemons');

//GET /pokedex
exports.getPokedex = (request, response, next) => {
    try {
        const pokemons = Pokemon.fetchAll();
        response.render('pokedex', { pokemons });
    } catch (error) {
        console.error("Error al cargar la Pokédex:", error);
        response.status(500).send("Error interno del servidor");
    }
};

//GET /pokedex/new
exports.getNuevoPokemon = (request, response, next) => {
    response.render('formulario');
};

//POST /pokedex/new
exports.postNuevoPokemon = (request, response, next) => {
    const { nombre, descripcion, tipo, imagen, debilidades, fortalezas } = request.body;

    //validacion 
    if (!nombre || !descripcion || !tipo || !imagen || !debilidades || !fortalezas) {
        return response.status(400).send("Todos los campos son obligatorios");
    }

    try {
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
    } catch (error) {
        console.error("Error al guardar Pokémon:", error);
        response.status(500).send("Error interno del servidor");
    }
};