const Pokemon = require('../models/pokemons');

exports.getPokedex = (request, response, next) => {
    Pokemon.fetchAll()
        .then(([rows]) => {
            response.render('pokedex', { pokemons: rows });
        })
        .catch(error => {
            console.error("Error al cargar la Pokédex:", error);
            response.status(500).send("Error interno del servidor");
        });
};

exports.getNuevoPokemon = (request, response, next) => {
    response.render('formulario');
};

exports.postNuevoPokemon = (request, response, next) => {
    const { nombre } = request.body;
    const file = request.file;

    if (!nombre || !file) {
        return response.status(400).send("Nombre e imagen son obligatorios");
    }

    const imagenPath = '/images/pokemon/' + file.filename;
    const nuevoPokemon = new Pokemon(nombre, imagenPath);

    nuevoPokemon.save()
        .then(() => {
            response.redirect('/pokedex');
        })
        .catch(error => {
            console.error("Error al guardar Pokémon:", error);
            response.status(500).send("Error interno del servidor");
        });
};
