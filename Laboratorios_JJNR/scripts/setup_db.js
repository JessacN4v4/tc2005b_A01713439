/**
 * setup_db.js
 * Crea la base de datos labs_pokemon 
 *
 * Uso:
 *   node scripts/setup_db.js
 *
 * Requiere que MySQL esté corriendo localmente (XAMPP/WAMP/etc.)
 * con usuario root sin contraseña (ajusta HOST/USER/PASSWORD si es necesario).
 */

const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

const CONFIG = {
    host:     'localhost',
    user:     'root',
    password: '',          // cambia si tu root tiene contraseña
    multipleStatements: true
};

const SQL_FILE = path.join(__dirname, '..', 'sql', 'labs_pokemon.sql');

async function main() {
    const connection = await mysql.createConnection(CONFIG);
    console.log('Conectado a MySQL.');

    await connection.query('CREATE DATABASE IF NOT EXISTS `labs_pokemon` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;');
    await connection.query('USE `labs_pokemon`;');
    console.log('Base de datos "labs_pokemon" seleccionada.');

    const sql = fs.readFileSync(SQL_FILE, 'utf8');
    await connection.query(sql);
    console.log('Base de datos "labs_pokemon" configurada correctamente.');

    await connection.end();
}

main().catch(err => {
    console.error('Error al configurar la base de datos:', err.message);
    process.exit(1);
});
