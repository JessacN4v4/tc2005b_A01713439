alert("Bienvenid@ a mi pagina web de laboratorios tc2005b")
/*Encuentra el elemento con el id "indice" y lo guarda en una variable const header
*/
const header = document.getElementById("indice");

/*Creamos una caja vacia <div> de nombre manu para guardar los botones*/
const indice = document.createElement("div");

//Arrglo con los 3 botones que se van a crear
const botones=[
    { texto: "Datos del desarrollador", destino: "datos_desarrollador" },
    { texto: "Preguntas: Laboratorio 1", destino: "preguntas_lab_1" },
    { texto: "Preguntas: Laboratorio 3", destino: "preguntas_lab_2" },
    { texto: "Funciones Laboratorio 4", destino: "funciones_lab_4" },
    { texto: "Preguntas: Laboratorio 4", destino: "preguntas_lab_4"},
    { texto: "Descripción Material Design", destino: "descripcion_lab_5"},
    { texto: "Preguntas: Laboratorio 6", destino: "preguntas_lab_6"},
];

//PARA CADA elemento del arreglo botones se crea un boton con el texto en "texto:"
botones.forEach(op =>{
    const boton = document.createElement("button");
    boton.textContent =op.texto;

//Un poquito de estilo para los botones  
    boton.style.padding= "15px";
    boton.style.margin="5px";
    boton.classList.add("button", "is-info","is-dark");


//Evento que provoca un scroll hasta encontrar el elemento con el id destino
    boton.addEventListener("click",() => {
    document.getElementById(op.destino).scrollIntoView();
    });
//Agregamos el boton al <div>:indice
    indice.appendChild(boton);
});

//Insertamos el <div>:indice dentro del header
header.appendChild(indice);

//Estilos Bulma funcioales

function box_encabezados() {
    const encabezados = document.getElementsByClassName("encabezado_1");
    
    for (let i = 0; i < encabezados.length; i++) {
        const h = encabezados[i];

        // Crear la box
        const box = document.createElement("div");
        box.className = 'title is-3 is-flex is-justify-content-center is-align-items-center';
        box.className += " box has-background-link-dark has-text-white";

        // Insertar la box antes del encabezado
        h.parentNode.insertBefore(box, h);

        // Mover el encabezado dentro de la box
        box.appendChild(h);
    }
}

function centrar_preguntas() {
    const elementos = document.getElementsByClassName("pregunta");

    for (let i = 0; i < elementos.length; i++) {
    elementos[i].classList.add("title", "is-5", "has-text-centered");
    }
}

function tag_respuesta() {
    const respuestas = document.getElementsByClassName("respuesta");

    for (let i = 0; i < respuestas.length; i++) {
    const r = respuestas[i];

    // Aplicar estilo de tag danger
    r.classList.add("tag", "is-danger", "is-medium");
    }
}


// Funcion para abrir modal
function abrirModal(id_modal) {
    const modal = document.getElementById(id_modal);
    modal.classList.add("is-active");
}

// Funcin para cerrar modal
function cerrarModal(id_modal) {
    const modal = document.getElementById(id_modal);
    modal.classList.remove("is-active");
    
    // Limpiar contenidos de resultados
    const resultadoDiv = modal.querySelector('[id^="resultado_"]');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = '';
    }
    
    // Limpiar inputs
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('is-danger', 'is-success');
    });
    
    // Limpiar mensajes de ayuda
    const helps = modal.querySelectorAll('.help');
    helps.forEach(help => {
        help.textContent = '';
        help.classList.remove('is-danger', 'is-success');
    });
}

// Cerrar modales con los botones de cerrar
document.querySelectorAll('.modal .delete, .cerrar-modal, .modal-background').forEach(elemento => {
    elemento.addEventListener('click', function() {
        const modal = this.closest('.modal');
        cerrarModal(modal.id);
    });
});


// Navegar con el teclado: flechas hacia arriba y abajo
document.addEventListener('keydown', (evento) => {
    // Flecha hacia abajo
    if (evento.key === 'ArrowDown') {
        evento.preventDefault();
        window.scrollBy({
            top: 100,
            behavior: 'smooth'
        });
    }
    
    // Flecha hacia arriba
    if (evento.key === 'ArrowUp') {
        evento.preventDefault();
        window.scrollBy({
            top: -100,
            behavior: 'smooth'
        });
    }
});


//Funciones Laboratorio 4

//TABLA DE CUADRADOS Y CUBOS
document.getElementById("btn_tabla").addEventListener("click", () => {
    abrirModal("modal_tabla");
});

// INPUT validacion en tiempo real
document.getElementById("input_tabla").addEventListener("input", (e) => {
    const valor = e.target.value;
    const help = document.getElementById("help_tabla");
    
    if (valor === '') {
        e.target.classList.remove('is-danger', 'is-success');
        help.textContent = '';
        return;
    }
    
    if (isNaN(valor) || parseInt(valor) <= 0) {
        e.target.classList.add('is-danger');
        e.target.classList.remove('is-success');
        help.textContent = 'Debe ser un número mayor a 0';
        help.classList.add('is-danger');
    } else {
        e.target.classList.add('is-success');
        e.target.classList.remove('is-danger');
        help.textContent = '✓ Número válido';
        help.classList.remove('is-danger');
        help.classList.add('is-success');
    }
});

// SUBMIT generar tabla
document.getElementById("form_tabla").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const n = parseInt(document.getElementById("input_tabla").value);
    
    if (isNaN(n) || n <= 0) {
        return;
    }
    
    let tabla = '<div class="content"><h4 class="title is-5">Tabla del 1 al ' + n + '</h4>';
    tabla += '<table class="table is-striped is-fullwidth">';
    tabla += '<thead><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr></thead>';
    tabla += '<tbody>';
    
    for (let i = 1; i <= n; i++) {
        tabla += '<tr>';
        tabla += '<td>' + i + '</td>';
        tabla += '<td>' + (i * i) + '</td>';
        tabla += '<td>' + (i * i * i) + '</td>';
        tabla += '</tr>';
    }
    
    tabla += '</tbody></table></div>';
    
    document.getElementById("resultado_tabla").innerHTML = tabla;
});


//SUMA DE DOS NUMEROS
let num1, num2, tiempoInicio;

document.getElementById("btn_suma").addEventListener("click", () => {
    // Generar numeros aleatorios
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    
    // Mostrar la operacion
    document.getElementById("operacion_suma").textContent = `¿Cuánto es ${num1} + ${num2}?`;
    
    // Guardar tiempo inicial
    tiempoInicio = Date.now();
    
    // Limpiar resultado previo
    document.getElementById("resultado_suma").innerHTML = '';
    document.getElementById("input_suma").value = '';
    
    abrirModal("modal_suma");
});

// INPUT validacion en tiempo real
document.getElementById("input_suma").addEventListener("input", (e) => {
    const valor = e.target.value;
    const help = document.getElementById("help_suma");
    
    if (valor === '') {
        e.target.classList.remove('is-danger', 'is-success');
        help.textContent = '';
        return;
    }
    
    if (isNaN(valor)) {
        e.target.classList.add('is-danger');
        e.target.classList.remove('is-success');
        help.textContent = 'Debe ser un número';
        help.classList.add('is-danger');
    } else {
        e.target.classList.remove('is-danger');
        help.textContent = '';
        help.classList.remove('is-danger');
    }
});

// SUBMIT verificar respuesta
document.getElementById("form_suma").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const respuesta = parseInt(document.getElementById("input_suma").value);
    const tiempoFin = Date.now();
    const tiempoTranscurrido = ((tiempoFin - tiempoInicio) / 1000).toFixed(2);
    
    const resultadoDiv = document.getElementById("resultado_suma");
    const respuestaCorrecta = num1 + num2;
    
    let contenido = '<div class="content mt-4">';
    contenido += '<p><strong>Tu respuesta:</strong> ' + respuesta + '</p>';
    contenido += '<p><strong>Respuesta correcta:</strong> ' + respuestaCorrecta + '</p>';
    contenido += '<p><strong>Tiempo:</strong> ' + tiempoTranscurrido + ' segundos</p>';
    
    if (respuesta === respuestaCorrecta) {
        contenido += '<div class="notification is-success is-light">';
        contenido += '<p class="has-text-weight-bold">✓ ¡Correcto!</p>';
        contenido += '</div>';
    } else {
        contenido += '<div class="notification is-danger is-light">';
        contenido += '<p class="has-text-weight-bold">✗ Incorrecto</p>';
        contenido += '</div>';
    }
    
    contenido += '</div>';
    resultadoDiv.innerHTML = contenido;
});

//DATOS DEL ARREGLO
const arreglo_30 = [
    3, -1, 0, 5, -7, 0, 2, 9, -4, 6,
    0, -3, 8, 1, -2, 7, 0, -6, 4, 10,
    -9, 0, 12, -8, 15, 0, -5, 11, -10, 14
];

document.getElementById("btn_data").addEventListener("click", () => {
    // Mostrar el arreglo
    document.getElementById("arreglo_mostrado").textContent = '[' + arreglo_30.join(', ') + ']';
    
    // Contar negativos, ceros y positivos
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;
    
    for (let i = 0; i < arreglo_30.length; i++) {
        if (arreglo_30[i] < 0) {
            negativos++;
        } else if (arreglo_30[i] === 0) {
            ceros++;
        } else {
            positivos++;
        }
    }
    
    let resultado = '<div class="content">';
    resultado += '<div class="box has-background-danger-light has-text-dark">';
    resultado += '<p class="has-text-weight-bold">Números negativos: ' + negativos + '</p>';
    resultado += '</div>';
    resultado += '<div class="box has-background-warning-light has-text-dark">';
    resultado += '<p class="has-text-weight-bold">Ceros: ' + ceros + '</p>';
    resultado += '</div>';
    resultado += '<div class="box has-background-success-light has-text-dark">';
    resultado += '<p class="has-text-weight-bold">Números positivos: ' + positivos + '</p>';
    resultado += '</div>';
    resultado += '</div>';
    
    document.getElementById("resultado_data").innerHTML = resultado;
    
    abrirModal("modal_data");
});


//PROMEDIOS DEL ARREGLO
const matriz_30 = [
    [3, 5, 7, 2, 8, 1],
    [10, -2, 4, 6, 0, 9],
    [-5, -3, -1, 0, 2, 4],
    [12, 14, 16, 18, 20, 22],
    [7, 7, 7, 7, 7, 7]
];

document.getElementById("btn_promedios").addEventListener("click", () => {
    // Mostrar la matriz
    let matrizHTML = '';
    for (let i = 0; i < matriz_30.length; i++) {
        matrizHTML += '<p>Renglón ' + (i + 1) + ': [' + matriz_30[i].join(', ') + ']</p>';
    }
    document.getElementById("matriz_mostrada").innerHTML = matrizHTML;
    
    // Calcular promedios
    let resultados = [];
    for (let i = 0; i < matriz_30.length; i++) {
        let fila = matriz_30[i];
        let suma = 0;
        
        for (let j = 0; j < fila.length; j++) {
            suma += fila[j];
        }
        
        let promedio = suma / fila.length;
        resultados.push(promedio);
    }
    
    // Mostrar resultados
    let resultadoHTML = '<div class="content"><h4 class="title is-5">Promedios calculados</h4>';
    for (let i = 0; i < resultados.length; i++) {
        resultadoHTML += '<div class="box has-background-info-light has-text-dark">';
        resultadoHTML += '<p class="has-text-weight-bold">Renglón ' + (i + 1) + ': ' + resultados[i].toFixed(2) + '</p>';
        resultadoHTML += '</div>';
    }
    resultadoHTML += '</div>';
    
    document.getElementById("resultado_promedios").innerHTML = resultadoHTML;
    
    abrirModal("modal_promedios");
});


//NUMERO INVERSO
document.getElementById("btn_inverso").addEventListener("click", () => {
    abrirModal("modal_inverso");
});

// Evento INPUT: Validación en tiempo real
document.getElementById("input_inverso").addEventListener("input", (e) => {
    const valor = e.target.value;
    const help = document.getElementById("help_inverso");
    
    if (valor === '') {
        e.target.classList.remove('is-danger', 'is-success');
        help.textContent = '';
        return;
    }
    
    if (isNaN(valor)) {
        e.target.classList.add('is-danger');
        e.target.classList.remove('is-success');
        help.textContent = 'Debe contener solo números';
        help.classList.add('is-danger');
    } else {
        e.target.classList.add('is-success');
        e.target.classList.remove('is-danger');
        help.textContent = '✓ Número válido';
        help.classList.remove('is-danger');
        help.classList.add('is-success');
    }
});

// SUBMIT invertir numero
document.getElementById("form_inverso").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const numero = document.getElementById("input_inverso").value.trim();
    
    if (numero === '' || isNaN(numero)) {
        return;
    }
    
    const invertido = numero.split("").reverse().join("");
    
    let resultado = '<div class="content mt-4 has-text-dark">';
    resultado += '<div class="box has-background-light has-text-dark">';
    resultado += '<p><strong>Número original:</strong> ' + numero + '</p>';
    resultado += '<p><strong>Número invertido:</strong> ' + invertido + '</p>';
    resultado += '</div>';
    resultado += '</div>';

    
    document.getElementById("resultado_inverso").innerHTML = resultado;
});

//PROBLEMA LEETCODE

document.getElementById("btn_problema").addEventListener("click", () => {
    // Datos de entrada
    let nums1 = [2, 3, 4, 7, 9, 0, 0, 0];
    let m = 5;
    let nums2 = [1, 4, 7];
    let n = 3;
    
    // Indices para recorrer desde el final
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;
    
    // Fusionar desde el final hacia el inicio
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
    
    // Mostrar resultado
    let resultado = '<div class="content">';
    resultado += '<h4 class="title is-5">Resultado de la fusión</h4>';
    resultado += '<div class="box has-background-success-light has-text-dark">';
    resultado += '<p class="has-text-weight-bold">Salida: [' + nums1.join(', ') + ']</p>';
    resultado += '</div>';
    resultado += '</div>';
    
    document.getElementById("resultado_problema").innerHTML = resultado;
    
    abrirModal("modal_problema");
});

