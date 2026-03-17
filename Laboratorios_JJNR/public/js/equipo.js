document.addEventListener("DOMContentLoaded", () => {

    const csrfToken = document.getElementById("csrfToken").value;

    const slots = Array.from(document.querySelectorAll(".slot"));
    const items = Array.from(document.querySelectorAll(".poke-item"));
    const btnDetalle = document.getElementById("btn-detalle");

    let equipo = slots.map(slot => {
        const id = slot.dataset.id;
        return id && id !== "" ? id : null;
    });

    const equipoEstaLleno = () => equipo.every(x => x !== null);

    const activarBoton = () => {
        btnDetalle.classList.remove("bg-gray-400", "text-gray-700", "cursor-not-allowed");
        btnDetalle.classList.add("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
        btnDetalle.href = "/equipo/detalle";
    };

    const desactivarBoton = () => {
        btnDetalle.classList.add("bg-gray-400", "text-gray-700", "cursor-not-allowed");
        btnDetalle.classList.remove("bg-purple-600", "text-white", "hover:bg-purple-700", "cursor-pointer");
        btnDetalle.href = "#";
    };

    const actualizarBotonDetalle = () => {
        if (equipoEstaLleno()) {
            activarBoton();
            enviarEquipoSiEstaLleno();
        } else {
            desactivarBoton();
        }
    };

    const enviarEquipoSiEstaLleno = () => {
        if (!equipoEstaLleno()) return;

        fetch("/equipo/actualizar", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken   
            },
            body: JSON.stringify({ equipo })
        });
    };

    const agregarPokemon = (item) => {
        const id = item.dataset.id; 
        const slotLibre = equipo.indexOf(null);
        if (slotLibre === -1) return;

        equipo[slotLibre] = id;

        const imgSrc = item.querySelector("img").src;
        const nombre = item.querySelector("h3").textContent;

        slots[slotLibre].dataset.id = id;
        slots[slotLibre].innerHTML = `
            <div class="text-center">
                <img src="${imgSrc}" class="w-16 mx-auto">
                <p class="font-bold">${nombre}</p>
            </div>
        `;

        item.style.display = "none";
        actualizarBotonDetalle();
    };

    const quitarPokemon = (index) => {
        if (!equipo[index]) return;

        const id = equipo[index];
        equipo[index] = null;

        slots[index].dataset.id = "";
        slots[index].innerHTML = "Vacío";

        const item = document.querySelector(`[data-id="${id}"]`);
        if (item) item.style.display = "block";

        actualizarBotonDetalle();
    };

    items.forEach(item => {
        item.addEventListener("click", () => agregarPokemon(item));
    });

    slots.forEach((slot, index) => {
        slot.addEventListener("click", () => quitarPokemon(index));
    });

    actualizarBotonDetalle();
});