const LEGENDARIES = require('./legendaries');

const BASE = 'https://pokeapi.co/api/v2';
const cache = new Map();

async function fetchJSON(url) {
    if (cache.has(url)) return cache.get(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`PokeAPI ${res.status}: ${url}`);
    const data = await res.json();
    cache.set(url, data);
    return data;
}

async function getAllNonLegendary() {
    const data = await fetchJSON(`${BASE}/pokemon?limit=1025&offset=0`);
    return data.results
        .map(p => {
            const id = parseInt(p.url.split('/').filter(Boolean).pop());
            return { id, name: p.name };
        })
        .filter(p => !LEGENDARIES.has(p.id));
}

async function getPokemonDetail(nameOrId) {
    const pokemon = await fetchJSON(`${BASE}/pokemon/${nameOrId}`);
    const species = await fetchJSON(pokemon.species.url);

    const types = pokemon.types.map(t => t.type.name);

    const flavorEntry = species.flavor_text_entries
        .filter(e => e.language.name === 'en')
        .pop();
    const description = flavorEntry
        ? flavorEntry.flavor_text.replace(/[\f\n\r]/g, ' ')
        : '';

    return { id: pokemon.id, name: pokemon.name, types, description };
}

module.exports = { getAllNonLegendary, getPokemonDetail };
