//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document);
const gwen = {
    nombre: "Gwen",
    descripcion: "Gwen es una campeona de League of Legends, conocida por su habilidad para infligir daño mágico y su capacidad para curarse a sí misma. Es una luchadora ágil y versátil que puede desempeñar varios roles en el juego, como top laner o mid laner. Gwen es especialmente efectiva contra campeones que dependen de ataques básicos, ya que su habilidad 'Corte de Tijera' le permite esquivar ataques enemigos y contraatacar con daño adicional. Su historia se centra en su búsqueda de venganza contra el asesino de su padre, lo que la convierte en un personaje intrigante y complejo dentro del universo de League of Legends.",
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
}
const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

const mostrar_datos = () => {
    div_gwen.innerHTML = `
    <p class="is-size-2">${gwen.nombre}</p>
    <p>${gwen.descripcion}</p>
    <span class="tag">${gwen.tipo}</span>
    `;
    div_gwen.onclick = mostrar_imagen;
}

const mostrar_imagen = () => {
    div_gwen.innerHTML = `
    <figure class="image">
        <img class="is-rounded" src="${gwen.imagen}">
    </figure>
    `;
    div_gwen.onclick = mostrar_datos;
}

mostrar_imagen();
div_gwen.onclick = mostrar_datos;