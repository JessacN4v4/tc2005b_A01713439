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

async function getTypeEffectiveness(typeNames) {
    const mult = {};
    for (const typeName of typeNames) {
        const t = await fetchJSON(`${BASE}/type/${typeName}`);
        for (const x of t.damage_relations.double_damage_from)
            mult[x.name] = (mult[x.name] || 1) * 2;
        for (const x of t.damage_relations.half_damage_from)
            mult[x.name] = (mult[x.name] || 1) * 0.5;
        for (const x of t.damage_relations.no_damage_from)
            mult[x.name] = 0;
    }
    const weaknesses = Object.entries(mult)
        .filter(([, m]) => m > 1)
        .sort((a, b) => b[1] - a[1])
        .map(([type, m]) => ({ type, mult: m }));
    const resistances = Object.entries(mult)
        .filter(([, m]) => m < 1)
        .sort((a, b) => a[1] - b[1])
        .map(([type, m]) => ({ type, mult: m }));
    return { weaknesses, resistances };
}

// Usado por la Pokédex (cards): solo tipos + descripción
async function getPokemonBasic(nameOrId) {
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

// Usado por detalle de equipo VGC: tipos, habilidades, debilidades, moveset SV
async function getPokemonVGC(nameOrId) {
    const pokemon = await fetchJSON(`${BASE}/pokemon/${nameOrId}`);
    const species = await fetchJSON(pokemon.species.url);

    const types = pokemon.types.map(t => t.type.name);

    const abilities = pokemon.abilities.map(a => ({
        name: a.ability.name.replace(/-/g, ' '),
        hidden: a.is_hidden
    }));

    const { weaknesses, resistances } = await getTypeEffectiveness(types);

    // Top 4 moves: level-up de SV ordenados por nivel desc; fallback a level-up de cualquier gen
    const svLevelUp = pokemon.moves
        .flatMap(m => m.version_group_details
            .filter(v => v.version_group.name === 'scarlet-violet' && v.move_learn_method.name === 'level-up')
            .map(v => ({ name: m.move.name.replace(/-/g, ' '), level: v.level_learned_at }))
        )
        .sort((a, b) => b.level - a.level)
        .map(m => m.name);

    const fallbackMoves = pokemon.moves
        .filter(m => m.version_group_details.some(v => v.move_learn_method.name === 'level-up'))
        .map(m => m.move.name.replace(/-/g, ' '));

    const moves = (svLevelUp.length > 0 ? svLevelUp : fallbackMoves).slice(0, 4);

    return { id: pokemon.id, name: pokemon.name, types, abilities, weaknesses, resistances, moves };
}

module.exports = { getAllNonLegendary, getPokemonBasic, getPokemonVGC };
