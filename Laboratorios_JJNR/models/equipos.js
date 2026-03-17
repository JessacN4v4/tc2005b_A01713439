const db = require('../utils/database');

module.exports = class Equipo {

    //Obtener equipo del usuario
    static getEquipo(idUser) {
        return db.execute(
            'SELECT slot, pokemon_id FROM equipo WHERE usuario_id = ? ORDER BY slot ASC',
            [idUser]
        );
    }

    //Guardar equipo completo
    static async setEquipo(idUser, nuevoEquipo) {

    if (!Array.isArray(nuevoEquipo) || nuevoEquipo.length !== 6) {
        throw new Error("Equipo inválido");
    }

    //borrar equipo anterior
    await db.execute('DELETE FROM equipo WHERE usuario_id = ?', [idUser]);

    const inserts = nuevoEquipo
        .map((idPokemon, index) => {
            if (!idPokemon) return null;
            return db.execute(
                'INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (?, ?, ?)',
                [idUser, idPokemon, index]
            );
        })
        .filter(Boolean);

    return Promise.all(inserts);
}


    //Verificar si esta lleno
    static async estaLleno(idUser) {
        const [rows] = await db.execute(
            'SELECT COUNT(*) AS total FROM equipo WHERE usuario_id = ?',
            [idUser]
        );
        return rows[0].total === 6;
    }

    //Limpiar equipo
    static limpiar(idUser) {
        return db.execute('DELETE FROM equipo WHERE usuario_id = ?', [idUser]);
    }
};
