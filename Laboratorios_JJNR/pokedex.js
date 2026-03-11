
// flip de las cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flip");
    });
});

// logica del equipo en ruta /team
const slots = document.querySelectorAll(".slot");
const catalogo = document.querySelectorAll(".poke-item");

let equipo = Array(6).fill(null);

// agregar al equipo
catalogo.forEach(item => {
    item.addEventListener("click", () => {
        const nombre = item.dataset.nombre;

        const slotLibre = equipo.indexOf(null);
        if (slotLibre === -1) return;

        equipo[slotLibre] = nombre;

        slots[slotLibre].innerHTML = `
            <div class="text-center">
                <img src="${item.querySelector("img").src}" class="w-16 mx-auto">
                <p class="font-bold">${nombre}</p>
            </div>
        `;

        item.style.display = "none";
    });
});

// quitar del equipo
slots.forEach((slot, index) => {
    slot.addEventListener("click", () => {
        if (!equipo[index]) return;

        const nombre = equipo[index];
        equipo[index] = null;

        slot.innerHTML = "Vacío";

        document.querySelector(`[data-nombre="${nombre}"]`).style.display = "block";
    });
});