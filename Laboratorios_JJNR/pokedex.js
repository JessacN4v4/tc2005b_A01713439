//Pagina pokedex
// Lista basica de Pokemon con imagenes
const pokemons = [
    { nombre: "Umbreon", img: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/197.png" },
    { nombre: "Sableye", img: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/302.png" },
    { nombre: "Dratini", img: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/147.png" },
    { nombre: "Gengar", img: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png" }
];

function cargarPokedex() {
    const contenedor = document.getElementById("pokedex");

    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${pokemon.img}" alt="${pokemon.nombre}">
            <h3>${pokemon.nombre}</h3>
        `;

        contenedor.appendChild(card);
    });
}

// Ejecutar funcion al cargar la pagina
cargarPokedex();