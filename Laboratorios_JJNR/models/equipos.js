const db = require('../utils/database');

module.exports = class Equipo {

    //Obtener slots del equipo (usado internamente para limpiar/verificar)
    static getEquipo(idUser) {
        return db.execute(
            'SELECT slot, pokemon_id FROM equipo WHERE usuario_id = ? ORDER BY slot ASC',
            [idUser]
        );
    }

    //Obtener equipo completo con JOIN a pokemon (usa SP sp_obtener_equipo)
    static getEquipoCompleto(idUser) {
        return db.query('CALL sp_obtener_equipo(?)', [parseInt(idUser)]);
    }

    //Guardar equipo completo (usa stored procedure sp_guardar_equipo)
    static async setEquipo(idUser, nuevoEquipo) {
        if (!Array.isArray(nuevoEquipo) || nuevoEquipo.length !== 6) {
            throw new Error('Equipo inválido');
        }
        const slots = nuevoEquipo.map(id => (id ? parseInt(id) : null));
        return db.query('CALL sp_guardar_equipo(?, ?, ?, ?, ?, ?, ?)', [parseInt(idUser), ...slots]);
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
