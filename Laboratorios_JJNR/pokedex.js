
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

// funcion para activar/desactivar boton detalla de equipo
function actualizarBotonDetalle() {
    const slots = document.querySelectorAll(".slot");
    const btn =document.getElementById("btn-detalle");

    const lleno = [...slots].every(s => !s.textContent.includes("Vacío"));

    if (btn) {
        if (lleno) {
            btn.classList.remove("bg-gray-400", "text-gray-700", "cursor-not-allowed");
            btn.classList.add("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
            btn.href = "/equipo/detalle";

            enviarEquipoSiEstaLleno(); // ← SOLO AQUÍ SE ENVÍA
        } else {
            btn.classList.add("bg-gray-400", "text-gray-700", "cursor-not-allowed");
            btn.classList.remove("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
            btn.href = "#";
        }
    }
}

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

    actualizarBotonDetalle(); 
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

        actualizarBotonDetalle();
    });
});

// funcion que manda el equipo selecionado solo si estan llenos los slots
function enviarEquipoSiEstaLleno() {
    const lleno = equipo.every(x => x !== null);

    if (lleno) {
        fetch('/equipo/actualizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ equipo })
        });
    }
}

