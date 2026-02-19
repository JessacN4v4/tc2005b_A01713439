alert("Bienvenidos a mi pagina web de laboratorios tc2005b")
/*Encuentra el elemento con el id "indice" y lo guarda en una variable const header
*/
const header = document.getElementById("indice");

/*Creamos una caja vacia <div> de nombre manu para guardar los botones*/
const indice = document.createElement("div");

//Arrglo con los 3 botones que se van a crear
const opciones=[
  { texto: "Datos del desarrollador", destino: "datos_desarrollador" },
  { texto: "Preguntas: Laboratorio 1", destino: "preguntas_lab_1" },
  { texto: "Preguntas: Laboratorio 3", destino: "preguntas_lab_2" },
  { texto: "Funciones Laboratorio 4", destino: "funciones_lab_4" },
  { texto: "Preguntas: Laboratorio 4", destino: "preguntas_lab_4"},
];

//PARA CADA elemento del arreglo opciones se crea un boton con el texto en "texto:"
opciones.forEach(op =>{
  const boton = document.createElement("button");
  boton.textContent =op.texto;

//Un poquito estilo para los botones  
  boton.style.padding= "15px";
  boton.style.margin="5px";
  boton.style.backgroundColor="green";
  
//Evento que provoca un scroll hasta encontrar el elemento con el id destino
  boton.addEventListener("click",() => {
    document.getElementById(op.destino).scrollIntoView();
  });
//Agregamos el boton al <div>:indice
  indice.appendChild(boton);
});

//Insertamos el <div>:indice dentro del header
header.appendChild(indice);


//Funciones Laboratorio 4

//Tabla de cuadrados y cubos
function tabla() {
//Pedir el numero
  let n = prompt("Ingresa un número:");

//Convertir el número a real
  n = parseInt(n);

//Validar entrada
  if (isNaN(n) || n <= 0) {
    document.write("Entrada inválida. Debes ingresar un número mayor a 0.");
    return;
  }

//Escribir la tabla
  document.write("<h2>Tabla del 1 al " + n + "</h2>");
  document.write("<table border='1' cellpadding='5'>");
  document.write("<tr><th>Número</th><th>Cuadrado del número</th><th>Cubo del número</th></tr>");

  for (let i = 1; i <= n; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + (i * i) + "</td>");
    document.write("<td>" + (i * i * i) + "</td>");
    document.write("</tr>");
  }

  document.write("</table>");
}

document.getElementById("btn_tabla").addEventListener("click", tabla);

//Suma de 2 números
function suma_aleatoria() {
//Se generan 2 numeros aleatorios entre 1 y 10
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;

//Guardar tiempo inicial
  const inicio = Date.now();

//Preguntar al usuario
  const respuesta = prompt(`¿Cuánto es ${a} + ${b}?`);

//Guardar tiempo final
  const fin = Date.now();

//Calcular tiempo en segundos
  const tiempo = (fin - inicio) / 1000;

//Convertir respuesta a número
  const r = parseInt(respuesta);

//Limpiar página y mostrar resultados
  document.write("<h2>Resultado de la suma aleatoria</h2>");
  document.write(`<p>La suma era: <strong>${a} + ${b}</strong></p>`);
  document.write(`<p>Tu respuesta: <strong>${respuesta}</strong></p>`);

  if (r === a + b) {
    document.write("<p style='color: green;'>✔ Respuesta correcta</p>");
  } else {
    document.write("<p style='color: red;'>✘ Respuesta incorrecta</p>");
    document.write(`<p>La respuesta correcta era: <strong>${a + b}</strong></p>`);
  }

  document.write(`<p>Tiempo de respuesta: <strong>${tiempo.toFixed(2)} segundos</strong></p>`);
}

document.getElementById("btn_suma").addEventListener("click", suma_aleatoria);

//Datos del arreglo
function contador(arreglo) {
  let negativos = 0;
  let ceros = 0;
  let positivos = 0;

  for (let i = 0; i < arreglo.length; i++) {
    if (arreglo[i] < 0) {
      negativos++;
    } else if (arreglo[i] === 0) {
      ceros++;
    } else {
      positivos++;
    }
  }

  document.write("<h2>Resultado del contador</h2>");
  document.write("<p>Números negativos: <strong>" + negativos + "</strong></p>");
  document.write("<p>Ceros: <strong>" + ceros + "</strong></p>");
  document.write("<p>Números positivos: <strong>" + positivos + "</strong></p>");
}

const arreglo_30 = [
  3, -1, 0, 5, -7, 0, 2, 9, -4, 6,
  0, -3, 8, 1, -2, 7, 0, -6, 4, 10,
  -9, 0, 12, -8, 15, 0, -5, 11, -10, 14
];

document.getElementById("btn_data").addEventListener("click", () => {
  contador(arreglo_30);
});


//Promedios del arreglo
function promedios(matriz) {
  let resultados = [];

  for (let i = 0; i < matriz.length; i++) {
    let fila = matriz[i];
    let suma = 0;

    for (let j = 0; j < fila.length; j++) {
      suma += fila[j];
    }

    let promedio = suma / fila.length;
    resultados.push(promedio);
  }

//Mostrar resultados
  document.write("<h2>Promedios de cada renglón</h2>");

  for (let i = 0; i < resultados.length; i++) {
    document.write(
      `<p>Renglón ${i + 1}: <strong>${resultados[i].toFixed(2)}</strong></p>`
    );
  }

  return resultados;
}

//Matriz con 30 numeros
const matriz_30 = [
  [3, 5, 7, 2, 8, 1],
  [10, -2, 4, 6, 0, 9],
  [-5, -3, -1, 0, 2, 4],
  [12, 14, 16, 18, 20, 22],
  [7, 7, 7, 7, 7, 7]
];

document.getElementById("btn_promedios").addEventListener("click", () => {
  promedios(matriz_30);
});


//Numero inverso
function inverso() {
//Pedir un número al usuario
  let numero = prompt("Ingresa un número para invertir sus dígitos:");

//Se valida la entrada
  if (numero === null || numero.trim() === "") {
    document.write("<p>No ingresaste un número válido.</p>");
    return;
  }

//Convierte el numero en un string y elimina los espacios
  numero = numero.trim();

//Se invierten los dígitos
  let invertido = numero.split("").reverse().join("");

  document.write("<h2>Inverso del número</h2>");
  document.write(`<p>Número original: <strong>${numero}</strong></p>`);
  document.write(`<p>Número invertido: <strong>${invertido}</strong></p>`);
}


document.getElementById("btn_inverso").addEventListener("click", inverso);

//Problema
function resolver_problema() {
//Datos de entrada
  let nums1 = [2, 3, 4, 7, 9, 0, 0, 0];
  let m = 5;

  let nums2 = [1, 4, 7];
  let n = 3;

//Indices para recorrer desde el final
  let i = m - 1;        // ultimo elemento valido de nums1
  let j = n - 1;        // ultimo elemento de nums2
  let k = m + n - 1;    // ultima posición total de nums1

//Fusionar desde el final hacia el inicio
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

//Mostrar resultados
  document.write("<h2>Resultado del problema de fusión</h2>");
  document.write("<p><strong>Entrada:</strong></p>");
  document.write(`<p>nums1 = [2,3,4,7,9,0,0,0], m = 5</p>`);
  document.write(`<p>nums2 = [1,4,7], n = 3</p>`);

  document.write("<p><strong>Salida:</strong></p>");
  document.write(`<p>[${nums1.join(", ")}]</p>`);
}

//
document.getElementById("btn_problema").addEventListener("click", resolver_problema);






