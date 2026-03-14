// models/Equipo.js

let equipo = Array(6).fill(null);

module.exports = class Equipo {

    // Obtener el equipo actual (arreglo de 6 posiciones)
    static getEquipo() {
        return equipo;
    }

    //Reemplazar el equipo completo (desde el frontend)
    static setEquipo(nuevoEquipo) {
        equipo = nuevoEquipo;
    }

    //Saber si el equipo está lleno
    static estaLleno() {
        return equipo.every(x => x !== null);
    }

    //Limpiar el equipo después de ver el detalle
    static limpiar() {
        equipo = Array(6).fill(null);
    }
};