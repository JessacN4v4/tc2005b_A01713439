console.log("hola desde node!");

const filesystem = require('fs');
const path = require('path');

setTimeout(() => {
    console.log("jojo te hackie");
}, 11000);

const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];

for (let item of arreglo) {
    setTimeout(() => {
        console.log(item);
    }, item);
}

const http = require('http');

const html = ` 
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi Pokédex</title>
        <link rel="stylesheet" href="pokedex.css">
    </head>
    <body>

        <h1>Mi Pokédex</h1>

        <div id="pokedex" class="pokedex-container">
        </div>

        <script src="pokedex.js"></script>
    </body>
    </html>
`;

const server = http.createServer((request, response) => {  
//    console.log(request);  
//    console.log(response);
    console.log(request.url);

    if (request.url === "/" || request.url ==="/pokedex"){
        response.setHeader('Content-Type', 'text/html');
        response.write(html);
        response.end();
        return;
    }
    
    const filePath = path.join(__dirname, request.url);

    filesystem.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.end("Archivo no encontrado");
            return;
        }

        const ext = path.extname(filePath);
        const mimeTypes = {
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
        };

        response.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
        response.end(data);
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

// Funcion obtener promedio
const arregloPromedio = [10, 20, 30, 40, 50];

function obtenerPromedio(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        return 0;
    }
    const suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma / numeros.length;
}

console.log("Promedio del arreglo:", obtenerPromedio(arregloPromedio));


// Funcion para escribir archivo
function escribirArchivo(contenido) {
    try {
        filesystem.writeFileSync('hols.txt', contenido);
        console.log('Archivo "hols.txt" escrito correctamente.');
    } catch (error) {
        console.error("Error al escribir en hols.txt:", error);
    }
}

escribirArchivo('Este es un texto para mi laboratorio 8 de node.js');


// Funcion para contar vocales
function contarVocales(texto) {
    const vocales = 'aeiouAEIOU';
    let contador = 0;

    for (let letra of texto) {
        if (vocales.includes(letra)) {
            contador++;
        }
    }

    return contador;
}

const texto = "Hola, este es un texto de ejemplo para contar las vocales dentro del mismo.";
console.log(`El texto "${texto}" tiene ${contarVocales(texto)} vocales.`);