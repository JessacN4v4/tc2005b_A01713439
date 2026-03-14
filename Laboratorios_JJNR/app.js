const express = require('express');
const path = require('path');
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//viewa
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use('/', require('./routes/menu.routes'));
app.use('/pokedex', require('./routes/pokedex.routes'));
app.use('/equipo', require('./routes/equipo.routes'));

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});