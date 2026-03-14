const Pokemon = require('../models/pokemons');
const Equipo = require('../models/equipos');

//GET /equipo
exports.getEquipo = (request, response, next) => {

    const equipo = Equipo.getEquipo();

    const equipoConDatos = equipo.map(nombre =>
        nombre ? Pokemon.findByName(nombre) : null
    );

    response.render('equipo', {
        equipo: equipoConDatos,
        pokemons: Pokemon.fetchAll(),
        equipoLleno: Equipo.estaLleno()
    });
};

//GET /equipo/detalle
exports.getDetalle = (request, response, next) => {

    const equipo = Equipo.getEquipo()
        .filter(nombre => nombre)
        .map(nombre => Pokemon.findByName(nombre));

    response.render('detalle_equipo', { equipo });

    //limpiar equipo despues de mostrar detalle
    Equipo.limpiar();
};

//POST /equipo/actualizar
exports.postActualizar = (request, response, next) => {
    Equipo.setEquipo(request.body.equipo);
    response.json({ ok: true });
};