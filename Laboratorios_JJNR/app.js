const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//galletas
app.use(session({
    secret: 'un string muy largo y aleatorio',
    resave: false,
    saveUninitialized: false
}));

//routes
app.use('/', require('./routes/auth.routes'));     
app.use('/', require('./routes/menu.routes'));     
app.use('/', require('./routes/pokedex.routes'));  
app.use('/', require('./routes/equipo.routes'));   

app.use((request, response, next) => {
    response.status(404).send("La ruta no existe");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/login");
});