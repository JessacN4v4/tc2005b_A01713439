const Pokemon = require('../models/pokemons');
const Equipo = require('../models/equipos');

//GET /equipo
exports.getEquipo = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;

        if (!idUser) {
            return response.redirect('/login');
        }

        const [rows] = await Equipo.getEquipo(idUser);

        const equipo = Array(6).fill(null);
        rows.forEach(r => equipo[r.slot] = r.pokemon_id);

        const equipoConDatos = await Promise.all(
            equipo.map(async id => {
                if (!id) return null;
                const [p] = await Pokemon.findById(id);
                return p[0];
            })
        );

        const [pokemons] = await Pokemon.fetchAll();

        response.render('equipo', {
            equipo: equipoConDatos,
            pokemons,
            equipoLleno: rows.length === 6
        });

    } catch (error) {
        console.error("Error en getEquipo:", error);
        response.status(500).send("Error interno del servidor");
    }
};

//GET /equipo/detalle
exports.getDetalle = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;

        const [rows] = await Equipo.getEquipo(idUser);

        const equipoConDatos = await Promise.all(
            rows.map(async r => {
                const [p] = await Pokemon.findById(r.pokemon_id);
                return p[0];
            })
        );

        response.render('detalle_equipo', { equipo: equipoConDatos });

        await Equipo.limpiar(idUser);

    } catch (error) {
        console.error("Error en getDetalle:", error);
        response.status(500).send("Error interno del servidor");
    }
};

//POST /equipo/actualizar
exports.postActualizar = async (request, response, next) => {
    try {
        console.log("Equipo recibido:", request.body.equipo);
        const idUser = request.session.id_user;
        const nuevoEquipo = request.body.equipo;

        await Equipo.setEquipo(idUser, nuevoEquipo);

        response.json({ ok: true });

    } catch (error) {
        console.error("Error en postActualizar:", error);
        response.status(500).json({ ok: false });
    }
};