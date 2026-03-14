const pokemons = [
    {
        nombre: "Umbreon",
        descripcion: "Si se expone al aura de la luna, los anillos de su cuerpo relucen.",
        tipo: "Siniestro",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/197.png",
        debilidades: "Bicho, Hada, Lucha",
        fortalezas: "Fantasma, Psíquico"
    },
    {
        nombre: "Sableye",
        descripcion: "Hace su guarida en cuevas oscuras y come gemas.",
        tipo: "Siniestro/Fantasma",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/302.png",
        debilidades: "Hada",
        fortalezas: "Fantasma, Psíquico"
    },
    {
        nombre: "Dratini",
        descripcion: "Muda muchas veces de piel mientras crece.",
        tipo: "Dragón",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/147.png",
        debilidades: "Dragón, Hada, Hielo",
        fortalezas: "Dragón"
    },
    {
        nombre: "Gengar",
        descripcion: "Se oculta en las sombras y absorbe el calor de sus víctimas.",
        tipo: "Fantasma/Veneno",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png",
        debilidades: "Tierra, Fantasma, Siniestro",
        fortalezas: "Hada, Fantasma, Planta, Psíquico"
    },
    {
        nombre: "Lycanroc",
        descripcion: "Ataca con colmillos y garras afiladas.",
        tipo: "Roca",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/745.png",
        debilidades: "Tierra, Lucha, Planta, Agua, Hierro",
        fortalezas: "Fuego, Hielo, Volador, Bicho"
    },
    {
        nombre: "Gible",
        descripcion: "Permanece oculto en cuevas y muerde con fuerza.",
        tipo: "Dragón/Tierra",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/443.png",
        debilidades: "Hielo, Hada, Dragón",
        fortalezas: "Dragón, Roca, Fuego, Eléctrico, Veneno, Hierro"
    },
    {
        nombre: "Yamper",
        descripcion: "Genera electricidad al correr.",
        tipo: "Eléctrico",
        imagen: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/835.png",
        debilidades: "Tierra",
        fortalezas: "Agua, Volador"
    }
];

module.exports = class Pokemon {

    constructor(nombre, descripcion, tipo, imagen, debilidades, fortalezas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.imagen = imagen;
        this.debilidades = debilidades;
        this.fortalezas = fortalezas;
    }

    save() {
        pokemons.push(this);
    }

    static fetchAll() {
        return pokemons;
    }

    static findByName(nombre) {
        return pokemons.find(p => p.nombre === nombre);
    }
};