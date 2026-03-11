const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(express.json());


// rutas
app.use('/', require('./routes/menu.routes'));
app.use('/pokedex', require('./routes/pokedex.routes'));
app.use('/equipo', require('./routes/equipo.routes'));

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
