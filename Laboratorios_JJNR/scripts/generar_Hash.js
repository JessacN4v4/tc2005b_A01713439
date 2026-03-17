//Todos mis users estan registrados previamente
const bcrypt = require('bcryptjs');

const password = "a";
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log("Hash:");
console.log(hash);
