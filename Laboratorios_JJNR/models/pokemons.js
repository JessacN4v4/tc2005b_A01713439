const db = require('../utils/database');

module.exports = class Pokemon {

    constructor(nombre, descripcion, tipo, imagen, debilidades, fortalezas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagen = imagen;
        this.debilidades = debilidades;
        this.fortalezas = fortalezas;
    }

    save() {
        return db.execute(
            'INSERT INTO pokemon (nombre, descripcion, tipo, imagen, debilidades, fortalezas) VALUES (?, ?, ?, ?, ?, ?)',
            [this.nombre, this.descripcion, this.tipo, this.imagen, this.debilidades, this.fortalezas]
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
};
