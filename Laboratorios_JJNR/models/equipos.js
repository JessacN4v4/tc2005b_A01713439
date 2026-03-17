const db = require('../utils/database');

module.exports = class Equipo {

    //Obtener equipo del usuario
    static getEquipo(usuarioId) {
        return db.execute(
            'SELECT slot, pokemon_id FROM equipo WHERE usuario_id = ? ORDER BY slot ASC',
            [usuarioId]
        );
    }

    //Guardar equipo completo
    static async setEquipo(usuarioId, nuevoEquipo) {
        
        //borrar equipo anterior
        await db.execute('DELETE FROM equipo WHERE usuario_id = ?', [usuarioId]);

        //insertar nuevo equipo
        const inserts = nuevoEquipo.map((pokemonId, index) => {
            if (!pokemonId) return null;
            return db.execute(
                'INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (?, ?, ?)',
                [usuarioId, pokemonId, index]
            );
        });

        return Promise.all(inserts);
    }

    //Saber si el equipo esta lleno
    static async estaLleno(usuarioId) {
        const [rows] = await db.execute(
            'SELECT COUNT(*) AS total FROM equipo WHERE usuario_id = ?',
            [usuarioId]
        );
        return rows[0].total === 6;
    }

    //Limpiar equipo
    static limpiar(usuarioId) {
        return db.execute('DELETE FROM equipo WHERE usuario_id = ?', [usuarioId]);
    }
};