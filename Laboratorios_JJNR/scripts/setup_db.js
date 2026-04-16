/**
 * setup_db.js
 * Crea la base de datos labs_pokemon y carga el esquema + datos semilla.
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

    const sql = fs.readFileSync(SQL_FILE, 'utf8');
    await connection.query(sql);
    console.log('Base de datos "labs_pokemon" configurada correctamente.');
    console.log('Usuario de prueba → usuario: admin | password: a');

    await connection.end();
}

main().catch(err => {
    console.error('Error al configurar la base de datos:', err.message);
    process.exit(1);
});
