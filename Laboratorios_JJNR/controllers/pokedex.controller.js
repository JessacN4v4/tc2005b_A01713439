const Pokemon = require('../models/pokemons');
const { getAllNonLegendary, getPokemonDetail } = require('../utils/pokeapi');

exports.getPokedex = async (request, response, next) => {
    try {
        const [[dbRows], allPokemon] = await Promise.all([
            Pokemon.fetchAll(),
            getAllNonLegendary()
        ]);

        const capturedMap = {};
        for (const p of dbRows) {
            capturedMap[p.nombre.toLowerCase().trim()] = p;
        }

        response.render('pokedex', { allPokemon, capturedMap });
    } catch (err) {
        console.error('Error al cargar la Pokédex:', err);
        response.status(500).send('Error interno del servidor');
    }
};

exports.getNuevoPokemon = (request, response) => {
    response.render('formulario');
};

exports.postNuevoPokemon = (request, response, next) => {
    const { nombre } = request.body;
    const file = request.file;

    if (!nombre || !file) {
        return response.status(400).send('Nombre e imagen son obligatorios');
    }

    const imagenPath = '/images/pokemon/' + file.filename;
    const nuevoPokemon = new Pokemon(nombre.toLowerCase().trim(), imagenPath);

    nuevoPokemon.save()
        .then(() => response.redirect('/pokedex'))
        .catch(err => {
            console.error('Error al guardar Pokémon:', err);
            response.status(500).send('Error interno del servidor');
        });
};

// GET /pokedex/detail/:name  — JSON para el frontend
exports.getApiDetail = async (request, response, next) => {
    try {
        const data = await getPokemonDetail(request.params.name);
        response.json(data);
    } catch (err) {
        console.error('Error al obtener detalle de PokeAPI:', err);
        response.status(500).json({ error: 'No se pudo obtener el detalle' });
    }
};
