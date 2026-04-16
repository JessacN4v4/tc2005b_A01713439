// Script para resetear la contraseña de un usuario directamente en la base de datos.
// Uso: node scripts/resetear_password.js
const readline = require('readline');
const bcrypt = require('bcryptjs');
const db = require('../utils/database');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const preguntar = (texto) => new Promise(resolve => rl.question(texto, resolve));

(async () => {
    try {
        const usuario = await preguntar('Usuario a resetear: ');
        const nuevaPassword = await preguntar('Nueva contraseña: ');

        const [rows] = await db.execute('SELECT id_user FROM usuraios WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            console.log(`\nError: no existe el usuario "${usuario}".`);
            process.exit(1);
        }

        const hash = await bcrypt.hash(nuevaPassword, 10);
        await db.execute('UPDATE usuraios SET password = ? WHERE usuario = ?', [hash, usuario]);

        console.log(`\nContraseña de "${usuario}" actualizada correctamente.`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        rl.close();
        process.exit(0);
    }
})();
