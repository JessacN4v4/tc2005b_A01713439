const express = require('express');
const router = express.Router();

const html_header = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Menú Pokédex</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-900 text-center p-10">
    <section class="max-w-xl mx-auto">
        <h1 class="text-4xl font-bold text-indigo-600 mb-10">Menú Principal</h1>
`;

const html_footer = `
    </section>
    </body>
    </html>
`;

router.get('/', (request, response) => {
    const html = `
        <div class="flex flex-col gap-6">

            <a href="/pokedex" class="bg-indigo-600 text-white py-3 rounded text-xl shadow hover:bg-indigo-700 transition">
                Mi Pokédex
            </a>

            <a href="/equipo" class="bg-green-600 text-white py-3 rounded text-xl shadow hover:bg-green-700 transition">
                Mi Equipo
            </a>

            <a href="/pokedex/new" class="bg-yellow-500 text-white py-3 rounded text-xl shadow hover:bg-yellow-600 transition">
                Agregar Pokémon
            </a>

        </div>
    `;

    response.send(html_header + html + html_footer);
});

module.exports = router;