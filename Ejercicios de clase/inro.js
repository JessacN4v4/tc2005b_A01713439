// ejecutar javascript
console.log("hola mundo");
console.info("Creado en el 2009");
console.warn("Es adictivo");
console.error("Los tanques deben ir atras");

//Operadores de comparación
console.assert(1 == true);//compaar el valor sin importar el tipo de dato(solo que sean iguales)
console.assert(1 === true);//compara el valor y el tipo de dato(que sean estrictamente iguales)

//Variables, constantes
//Antigua
var personaje1 = "Gwen"; //Tiene mayor alcance por lo que no se recomienda su uso
//Moderna
let personaje2 = "Mordekaiser"; //Vive dentro del ambito dende se decalro

//Importancia de constantes
let precio_skin = 300;  //Se puede reasignar un nuevo valor a esta variable
const precio_skin1 =300; //No se puede reasignar un nuevo valor a esta variable, es una constante

//Alcance de las variables
{
var personaje3 = "Jax";
let personaje4 = "Garen";
}
console.log(personaje3);

//Mensaje de alerta
alert("No jueges esto oprfavor");

const personaje_fav = prompt("¿Cual es tu personaje favorito?");
console.info("Personaje favorito: " + personaje_fav);

const hoy_hay_juego = confirm("¿Un jueguito");

//Funciones
function descargar(){
    window.location.href = "https://www.leagueoflegends.com/es-mx/";
}

if (hoy_hay_juego) {
    console.warn("¡A jugar!");
} else {
    console.error("No hay jueguito :c");
}

//Funciones modernas
() => {}
document.getElementById("boton_desinstalar").onclick = () => {
    alert("JAJAJAJAJA no se puede desinstalar");
}


const iniciar_partida=() => {
    alert("Iniciar partida...");
}

iniciar_partida();

//Arreglos

const arreglo = ["Elemento"];
const arreglo2=new Array();

personajes.push("Irelia");
personajes[10]="Leona";

personajes ["hola"]="Lux";



//recorrer un arreglo
for(let personaje in personajes){
    console.log(personaje);
}

//Objetos
const eco_de_luden ={
    nombre: "Eco de Luden",
    color: "morado",
    daño: 100    
}
