const express = require('express');
const router = express.Router();
const pokemons = require('./pokemons.data');


let equipo = Array(6).fill(null);

// header
const html_header = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Mi Equipo</title>
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

// pagina principal de equipo
router.get('/', (request, response) => {

    let html = `
        <h1 class="text-4xl font-bold text-green-600 mb-8">Mi Equipo</h1>

        <div id="slots" class="grid grid-cols-3 gap-4 mb-8">
    `;

    for (let i = 0; i < 6; i++) {
        if (equipo[i]) {
            const p = pokemons.find(x => x.nombre === equipo[i]);
            html += `
                <div class="slot bg-indigo-100 h-32 rounded-xl shadow flex flex-col items-center justify-center">
                    <img src="${p.imagen}" class="w-16">
                    <p class="font-bold">${p.nombre}</p>
                </div>
            `;
        } else {
            html += `
                <div class="slot bg-indigo-100 h-32 rounded-xl shadow flex items-center justify-center text-gray-600">
                    Vacío
                </div>
            `;
        }
    }

    html += `</div>`;

    // boton que solo se activa s esta completo el equipo
    const equipoLleno = equipo.every(x => x !== null);

    html += `
    <a id="btn-detalle"
    href="#"
    class="bg-gray-400 text-gray-700 px-4 py-2 rounded shadow cursor-not-allowed transition">
    Detalle de equipo
    </a>
    `;


    // catalogo
    html += `
        <h3 class="text-2xl text-white font-semibold mt-10 mb-4">Catálogo</h3>

        <div id="catalogo" class="grid grid-cols-2 md:grid-cols-4 gap-6">
    `;

    for (let p of pokemons) {
        if (!equipo.includes(p.nombre)) {
            html += `
                <div class="poke-item bg-indigo-100 p-4 rounded-xl shadow cursor-pointer" data-nombre="${p.nombre}">
                    <img src="${p.imagen}" class="w-full h-32 object-contain">
                    <h3 class="text-lg font-bold mt-2">${p.nombre}</h3>
                </div>
            `;
        }
    }

    html += `</div>`;

    response.send(html_header + html + html_footer);
});

// detalle del equipo seleccionado
router.get('/detalle', (request, response) => {

    let html = `
        <h1 class="text-4xl font-bold text-purple-600 mb-8">Detalle del Equipo</h1>
    `;

    for (let nombre of equipo) {

    if (!nombre) continue; // evitar null o vacío

    const p = pokemons.find(x => x.nombre.trim() === nombre.trim());

    if (!p) continue; // evitarr undefined si no lo encentra

    html += `
        <div class="bg-indigo-100 p-6 rounded-xl shadow mb-6 flex gap-6 items-center">

            <img src="${p.imagen}" class="w-40 h-40 object-contain">

            <div class="text-left">
                <h2 class="text-3xl font-bold">${p.nombre}</h2>
                <p class="mt-2"><strong>Tipo:</strong> ${p.tipo}</p>
                <p class="mt-2"><strong>Descripción:</strong> ${p.descripcion}</p>
                <p class="mt-2 text-red-600"><strong>Débil a:</strong> ${p.debilidades}</p>
                <p class="mt-2 text-green-600"><strong>Fuerte contra:</strong> ${p.fortalezas}</p>
            </div>

        </div>
    `;
}


    response.send(html_header + html + html_footer);
});

router.post('/actualizar', (request, response) => {
    equipo = request.body.equipo;
    response.json({ ok: true });
});

module.exports = router;