const detailCache = {};

function buildBackContent(data) {
    const typesBadges = data.types
        .map(t => `<span class="type-badge type-${t}">${t}</span>`)
        .join('');

    return `
        <div class="p-3 text-left text-white text-xs h-full flex flex-col justify-center gap-2">
            <p class="font-bold capitalize text-sm">${data.name}</p>
            <div>${typesBadges}</div>
            <p class="text-gray-200 italic leading-snug">${data.description}</p>
        </div>
    `;
}

async function loadDetail(card, name) {
    const back = card.querySelector('.card-back');

    if (detailCache[name]) {
        back.innerHTML = buildBackContent(detailCache[name]);
        return;
    }

    back.innerHTML = '<p class="text-white text-sm p-4">Cargando...</p>';

    try {
        const res = await fetch(`/pokedex/detail/${name}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        detailCache[name] = data;
        back.innerHTML = buildBackContent(data);
    } catch {
        back.innerHTML = '<p class="text-red-300 text-sm p-4">Error al cargar</p>';
    }
}

// ── Eliminar Pokémon (AJAX) ───────────────────────────────────────────────────

async function eliminarPokemon(btn) {
    const id = parseInt(btn.dataset.id);
    const csrf = document.getElementById('csrfToken').value;

    fetch('/pokedex/eliminar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'csrf-token': csrf
        },
        body: JSON.stringify({ id_pokemon: id })
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.ok) {
            const wrapper = btn.closest('.poke-card-wrapper');
            wrapper.remove();
            const contador = document.getElementById('contador-capturados');
            contador.textContent = parseInt(contador.textContent) - 1;
        } else {
            alert('No se pudo eliminar: ' + (data.message || 'error'));
        }
    }).catch(err => {
        console.log(err);
    });
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

function activateTab(tabEl) {
    document.querySelectorAll('.tab-btn').forEach(t => {
        t.classList.remove('bg-indigo-600', 'text-white');
        t.classList.add('bg-gray-700', 'text-gray-300');
    });
    tabEl.classList.remove('bg-gray-700', 'text-gray-300');
    tabEl.classList.add('bg-indigo-600', 'text-white');
}

function filterCards(gen) {
    const esMis = gen === 'mis';
    document.querySelectorAll('.poke-card-wrapper').forEach(wrapper => {
        const cardGen = parseInt(wrapper.dataset.gen);
        const captured = wrapper.dataset.captured === 'true';

        if (esMis) {
            wrapper.style.display = captured ? '' : 'none';
        } else {
            wrapper.style.display = cardGen === parseInt(gen) ? '' : 'none';
        }
    });

    // Mostrar botón Eliminar solo en "Mis Pokémon"
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.classList.toggle('hidden', !esMis);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Flip + lazy-load
    document.querySelectorAll('.card[data-name]').forEach(card => {
        let loaded = false;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            if (!loaded) {
                loaded = true;
                loadDetail(card, card.dataset.name);
            }
        });
    });

    // Botones Eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // evita que active el flip de la card
            eliminarPokemon(btn);
        });
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activateTab(btn);
            filterCards(btn.dataset.gen);
        });
    });

    // Activar Gen 1 por defecto
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        activateTab(firstTab);
        filterCards(firstTab.dataset.gen);
    }
});
