const express = require('express');
const app = express();



app.use((request, response, next) => {
    console.log('Middleware!');
    next();
});

app.use('/new', (request, response, next) => {
    response.send('Aquí se va a crear un nuebo presonaje');
});

app.use((request, response, next) => {
    console.log('Middleware 2!');
    response.send('Hola desde Express!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});