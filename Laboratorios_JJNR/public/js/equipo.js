document.addEventListener("DOMContentLoaded", () => {
    const slots = Array.from(document.querySelectorAll(".slot"));
    const items = Array.from(document.querySelectorAll(".poke-item"));
    const btnDetalle = document.getElementById("btn-detalle");

    // estado inicial de equipo
    let equipo = slots.map(slot => {
        const nombre = slot.querySelector("p")?.textContent;
        return nombre && nombre !== "Vacío" ? nombre : null;
    });

    function equipoEstaLleno() {
        return equipo.every(x => x !== null);
    }

    // activar/desactivar boton detalle
    function actualizarBotonDetalle() {
        const lleno = equipoEstaLleno();

        if (lleno) {
            btnDetalle.classList.remove("bg-gray-400", "text-gray-700", "cursor-not-allowed");
            btnDetalle.classList.add("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
            btnDetalle.href = "/equipo/detalle";
            enviarEquipoSiEstaLleno();
        } else {
            btnDetalle.classList.add("bg-gray-400", "text-gray-700", "cursor-not-allowed");
            btnDetalle.classList.remove("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
            btnDetalle.href = "#";
        }
    }

    function enviarEquipoSiEstaLleno() {
        if (!equipoEstaLleno()) return;

        fetch("/equipo/actualizar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ equipo })
        });
    }

    function agregarPokemon(item) {
        const nombre = item.dataset.nombre;
        const slotLibre = equipo.indexOf(null);
        if (slotLibre === -1) return;

        equipo[slotLibre] = nombre;

        const imgSrc = item.querySelector("img").src;

        slots[slotLibre].innerHTML = `
            <div class="text-center">
                <img src="${imgSrc}" class="w-16 mx-auto">
                <p class="font-bold">${nombre}</p>
            </div>
        `;

        item.style.display = "none";
        actualizarBotonDetalle();
    }

    function quitarPokemon(index) {
        if (!equipo[index]) return;

        const nombre = equipo[index];
        equipo[index] = null;

        slots[index].innerHTML = "Vacío";

        const item = document.querySelector(`[data-nombre="${nombre}"]`);
        if (item) item.style.display = "block";

        actualizarBotonDetalle();
    }

    items.forEach(item => {
        item.addEventListener("click", () => agregarPokemon(item));
    });

    slots.forEach((slot, index) => {
        slot.addEventListener("click", () => quitarPokemon(index));
    });

    actualizarBotonDetalle();
});