const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'labs_pokemon',
    password: '' 
});

module.exports = pool.promise();
