const db = require('../utils/database');

module.exports = class Pokemon {

    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }

    save() {
        return db.execute(
            'INSERT INTO pokemon (nombre, imagen) VALUES (?, ?)',
            [this.nombre, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM pokemon');
    }

    static findById(idPokemon) {
        return db.execute('SELECT * FROM pokemon WHERE id_pokemon = ?', [idPokemon]);
    }

    static findByName(nombre) {
        return db.execute('SELECT * FROM pokemon WHERE nombre = ?', [nombre]);
    }

    static async deleteById(id) {
        // Primero limpia referencias en equipo para no violar FK
        await db.execute('DELETE FROM equipo WHERE pokemon_id = ?', [id]);
        return db.execute('DELETE FROM pokemon WHERE id_pokemon = ?', [id]);
    }
};
