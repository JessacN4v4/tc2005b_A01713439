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
    console.log('Tablas y datos iniciales creados.');

    // Stored procedures (se crean por separado porque su cuerpo contiene
    // punto y coma, lo que confundiría el parser de multipleStatements)
    await connection.query('DROP PROCEDURE IF EXISTS sp_guardar_equipo');
    await connection.query(`
        CREATE PROCEDURE sp_guardar_equipo(
            IN p_usuario_id INT,
            IN p0 INT, IN p1 INT, IN p2 INT,
            IN p3 INT, IN p4 INT, IN p5 INT
        )
        BEGIN
            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                ROLLBACK;
                RESIGNAL;
            END;

            START TRANSACTION;

            DELETE FROM equipo WHERE usuario_id = p_usuario_id;

            IF p0 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p0, 0); END IF;
            IF p1 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p1, 1); END IF;
            IF p2 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p2, 2); END IF;
            IF p3 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p3, 3); END IF;
            IF p4 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p4, 4); END IF;
            IF p5 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p5, 5); END IF;

            COMMIT;
        END
    `);
    console.log('Stored procedure sp_guardar_equipo creado.');

    await connection.query('DROP PROCEDURE IF EXISTS sp_obtener_equipo');
    await connection.query(`
        CREATE PROCEDURE sp_obtener_equipo(IN p_usuario_id INT)
        BEGIN
            SELECT e.slot, p.id_pokemon, p.nombre, p.imagen
            FROM equipo e
            INNER JOIN pokemon p ON p.id_pokemon = e.pokemon_id
            WHERE e.usuario_id = p_usuario_id
            ORDER BY e.slot ASC;
        END
    `);
    console.log('Stored procedure sp_obtener_equipo creado.');

    console.log('Base de datos "labs_pokemon" configurada correctamente.');
    await connection.end();
}

main().catch(err => {
    console.error('Error al configurar la base de datos:', err.message);
    process.exit(1);
});
