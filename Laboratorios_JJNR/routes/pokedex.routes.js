const express = require('express');
const router = express.Router();
const filesystem = require('fs');

// Base de datos
const pokemons = require('./pokemons.data');

// header
const html_header = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Mi Pokédex</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="/pokedex.css">
    </head>
    <body class="bg-gray-900 text-center p-6">
    <section class="max-w-5xl mx-auto">
`;

// footer
const html_footer = `
    <a href="/" class="block mt-10 text-indigo-600 underline text-lg">Volver al menú</a>
    <script src="/pokedex.js"></script>
    </section>
    </body>
    </html>
`;

// ruta principal, mi pokedex
router.get('/', (request, response) => {

    let html = `
        <h1 class="text-4xl font-bold text-indigo-600 mb-8">Mi Pokédex</h1>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
    `;

    for (let p of pokemons) {
        html += `
            <div class="bg-indigo-100 p-4 rounded-xl shadow card cursor-pointer">
                <div class="card-inner">
                    <div class="card-front flex flex-col items-center">
                        <img src="${p.imagen}" class="w-full h-40 object-contain">
                        <h3 class="text-xl font-bold mt-2">${p.nombre}</h3>
                    </div>

                    <div class="card-back bg-indigo-600 text-white p-4 rounded-xl flex flex-col justify-center">
                        <h3 class="text-xl font-bold">${p.nombre}</h3>
                        <p class="text-sm mt-2">${p.descripcion}</p>
                        <p class="font-semibold mt-2">Tipo: ${p.tipo}</p>
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div>`;

    response.send(html_header + html + html_footer);
});

// get (/new)formulario para agregar pokemon
router.get('/new', (request, response) => {

    const html = `
        <h1 class="text-3xl font-bold text-indigo-600 mb-6">Agregar Pokémon</h1>

        <form action="/pokedex/new" method="POST" class="bg-white p-6 rounded-xl shadow-md space-y-4">

            <div>
                <label class="block font-semibold mb-1">Nombre</label>
                <input name="nombre" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <div>
                <label class="block font-semibold mb-1">Descripción</label>
                <input name="descripcion" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <div>
                <label class="block font-semibold mb-1">Tipo</label>
                <input name="tipo" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <div>
                <label class="block font-semibold mb-1">Imagen (URL)</label>
                <input name="imagen" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <div>
                <label class="block font-semibold mb-1">Debilidades</label>
                <input name="debilidades" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <div>
                <label class="block font-semibold mb-1">Fortalezas</label>
                <input name="fortalezas" class="w-full bg-gray-100 border border-black p-2 rounded shadow-sm" type="text">
            </div>

            <input class="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition" type="submit" value="Guardar Pokémon">
        </form>
    `;

    response.send(html_header + html + html_footer);
});

// post (/new) se agega un pokemon y guarda en archivo
router.post('/new', (request, response) => {

    const { nombre, descripcion, tipo, imagen, debilidades, fortalezas } = request.body;

    pokemons.push({ nombre, descripcion, tipo, imagen, debilidades, fortalezas });

    // Guardar en archivo
    const registro = `
        Nombre: ${nombre}
        Descripción: ${descripcion}
        Tipo: ${tipo}
        Imagen: ${imagen}
        Debilidades: ${debilidades}
        Fortalezas: ${fortalezas}
        -----------------------------
    `;

    filesystem.appendFileSync("pokemons.txt", registro, "utf8");

    response.send(
        html_header +
        `<p class="text-green-600 font-bold text-xl">Pokémon agregado correctamente</p>` +
        html_footer
    );
});



module.exports = router;