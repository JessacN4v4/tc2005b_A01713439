const express = require('express');
const router = express.Router();
const pokemons = require('./pokemons.data');

let equipo = Array(6).fill(null);

// seleccion de dequipo
router.get('/', (request, response, next) => {

    const equipoConDatos = equipo.map(nombre =>
        nombre ? pokemons.find(p => p.nombre === nombre) : null
    );

    const equipoLleno = equipo.every(x => x !== null);

    response.render('equipo', {
        equipo: equipoConDatos,
        pokemons,
        equipoLleno
    });
});

// detalle de equipo
router.get('/detalle', (request, response,next) => {

    const equipoConDatos = equipo
        .filter(nombre => nombre)
        .map(nombre => pokemons.find(p => p.nombre === nombre));

    response.render('detalle_equipo', { equipo: equipoConDatos });

    equipo = Array(6).fill(null);
});

// mandar equipo desde frontend
router.post('/actualizar', (request, response, next) => {
    equipo = request.body.equipo;
    express.response.json({ ok: true });
});

module.exports = router;