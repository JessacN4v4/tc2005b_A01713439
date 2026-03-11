const http = require('http');
const filesystem = require('fs');
const path = require('path');


const pokemons =[
    {
        nombre: "Umbreon",
        descripcion: `Si se expone al aura de la luna, 
            los anillos de su cuerpo relucen y adquiere un poder misterioso`,
        tipo: "Sinisestro",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/197.png",
    },
    {
        nombre: "Sableye",
        descripcion: `Hace su guarida en cuevas oscuras. Usa sus afiladas garras para desenterrar 
            las gemas que se come`,
        tipo: "Sinisestro/Fantasma",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/302.png",
    },
    {
        nombre: "Dratini",
        descripcion: `Durante la etapa de crecimiento, muda muchas veces de piel y se protege 
            mediante una cascada`,
        tipo: "Dragón",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/147.png",
    },
    {
        nombre: "Gengar",
        descripcion: `De noche, se oculta en las sombras y absorbe el calor de sus víctimas, que 
            sufren escalofríos irrefrenables`,
        tipo: "Fantasma/Veneno",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png",
    },
    {
        nombre: "Lycanroc",
        descripcion: `Ataca a sus presas con sus afilados colmillos y garras. Solo obedece 
            las órdenes de aquellos Entrenadores que logran ganarse su confianza`,
        tipo: "Roca",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/745.png",
    },
    {
        nombre: "Gible",
        descripcion: `Permanece oculto en cuevas y, cuando pasa una presa, se abalanza sobre ella 
            y la muerde con tanta fuerza que hasta se le rompen los dientes`,
        tipo: "Dragón/Tierra",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/443.png",
    },
    {
        nombre: "Yamper",
        descripcion: `Al correr, genera electricidad por la base de la cola. Es muy popular entre 
            los pastores de Galar`,
        tipo: "Eléctrico",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/835.png",
    },

];

const html_header = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Mi Pokédex</title>

        <script src="https://cdn.tailwindcss.com"></script>

        <link rel="stylesheet" href="pokedex.css">
    </head>
    <body class="bg-gray-100 text-center p-6">
    <section class="max-w-5xl mx-auto">

        <h1 class="text-4xl font-bold text-indigo-600 mb-8">
            <a href="/">Mi Pokédex</a>
        </h1>
`;

const html_footer = `
    </section>
    <script src="/pokedex.js"></script>
    </body>
    </html>
`;

const html_form =`
    <form action="/new" method="POST" class="bg-white p-6 rounded-xl shadow-md space-y-4">

        <div>
            <label class="block font-semibold">Nombre</label>
            <input name="nombre" class="w-full border p-2 rounded" type="text">
        </div>

        <div>
            <label class="block font-semibold">Descripción</label>
            <input name="descripcion" class="w-full border p-2 rounded" type="text">
        </div>

        <div>
            <label class="block font-semibold">Tipo</label>
            <input name="tipo" class="w-full border p-2 rounded" type="text">
        </div>

        <div>
            <label class="block font-semibold">Imagen (URL)</label>
            <input name="imagen" class="w-full border p-2 rounded" type="text">
        </div>

        <input class="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer" type="submit" value="Guardar Pokémon">
    </form>
`;

const server = http.createServer((request,response)=>{
    if (request.url === "/"){
        let html_index = `
            <div class="flex gap-4 mb-6">
                <a class="bg-indigo-600 text-white px-4 py-2 rounded" href="/new">Agregar Pokémon</a>
                <a class="bg-green-600 text-white px-4 py-2 rounded" href="/team">Mi equipo</a>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        `;
        
        for (let p of pokemons){
            html_index += `
                <div class="bg-white p-4 rounded-xl shadow card cursor-pointer">
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

        html_index += `</div>`;

        response.setHeader("Content-Type", "text/html");
        response.end(html_header + html_index + html_footer);
        return;
    }

    // ruta /new GET
    if (request.url ==="/new" && request.method === "GET"){
        response.setHeader("Content-Type", "text/html");
        response.end(html_header + html_form + html_footer);
        return;
    }

    //ruta /new POST
    if (request.url === "/new" && request.method === "POST"){
        const datos =[];

        request.on("data", chunk => datos.push(chunk));

        request.on("end",()=>{
            const body = Buffer.concat(datos).toString();
            const partes = body.split("&");

            pokemons.push({
                nombre: decodeURIComponent(partes[0].split("=")[1]),
                descripcion: decodeURIComponent(partes[1].split("=")[1]),
                tipo: decodeURIComponent(partes[2].split("=")[1]),
                imagen: decodeURIComponent(partes[3].split("=")[1]),
            });

            response.setHeader("Content-Type", "text/html");
            response.end(
                html_header + 
                `<p class="text-green-600 font-bold">Pokémon agregado correctamente</p>`+ 
                html_footer
            );
        });
        
        return;
    }

    //ruta /team
    if(request.url === "/team"){
        let html_team = `
            <h2 class="text-3xl font-bold mb-4">Elige tu equipo</h2>

            <!-- Caja de 6 slots -->
            <div id="slots" class="grid grid-cols-3 gap-4 mb-8">
                ${Array(6).fill(`<div class="slot bg-white h-32 rounded-xl shadow flex 
                items-center justify-center text-gray-400">Vacío</div>`).join("")}
            </div>

            <h3 class="text-2xl font-semibold mb-4">Catálogo</h3>

            <div id="catalogo" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        `;

        for (let p of pokemons){
            html_team += `
                <div class="poke-item bg-white p-4 rounded-xl shadow cursor-pointer" data-nombre="${p.nombre}">
                    <img src="${p.imagen}" class="w-full h-32 object-contain">
                    <h3 class="text-lg font-bold mt-2">${p.nombre}</h3>
                </div>
            `;
        }

        html_team += `</div>`

        
        response.setHeader("Content-Type", "text/html");
        response.end(html_header + html_team +html_footer);
        return;
    }

    const filePath = path.join(__dirname, request.url);

    filesystem.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.end("404 Not Found");
            return;
        }

        const ext = path.extname(filePath);
        const mime = {
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg"
        };

        response.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
        response.end(data);
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
