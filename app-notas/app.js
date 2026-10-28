class Tarea {
  constructor(nombre) {
    this.nombre = nombre;
    this.completada = false;
  }

  completar() {
    this.completada = !this.completada;
  }

  obtenerDescripcion() {
    return this.nombre;
  }
}

const formTarea = document.querySelector("#formTarea");
const nombreTarea = document.querySelector("#nombreTarea");
const listaTareas = document.querySelector("#listaTareas");
const mensaje = document.querySelector("#mensaje");
const resumen = document.querySelector("#resumen");

const tareas = [
  new Tarea("Estudiar JavaScript"),
  new Tarea("Completar el laboratorio"),
  new Tarea("Subir el proyecto a GitHub"),
];

let tareaEliminada = null;
let temporizadorDeshacer = null;

function mostrarMensaje(texto) {
  mensaje.replaceChildren();
  mensaje.append(document.createTextNode(texto));
}

function actualizarResumen() {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  const completadas = tareas.filter((tarea) => tarea.completada).length;

  resumen.textContent =
    `Total: ${tareas.length} tareas. ` +
    `Pendientes: ${pendientes}. Completadas: ${completadas}.`;
}

function mostrarTareas() {
  listaTareas.replaceChildren();

  if (tareas.length === 0) {
    const elementoVacio = document.createElement("li");
    elementoVacio.classList.add("vacio");
    elementoVacio.textContent = "No tienes tareas. ¡Agrega una nueva!";
    listaTareas.appendChild(elementoVacio);
  }

  tareas.forEach((tarea, indice) => {
    const elemento = document.createElement("li");
    elemento.classList.add("tarea");

    const texto = document.createElement("span");
    texto.classList.add("texto-tarea");
    texto.textContent = tarea.obtenerDescripcion();

    if (tarea.completada) {
      texto.classList.add("completada");
    }

    const botonCompletar = document.createElement("button");
    botonCompletar.type = "button";
    botonCompletar.textContent = tarea.completada ? "Reabrir" : "Completar";
    botonCompletar.dataset.accion = "completar";
    botonCompletar.dataset.indice = indice;
    botonCompletar.setAttribute(
      "aria-label",
      `${tarea.completada ? "Reabrir" : "Completar"}: ${tarea.nombre}`,
    );

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar");
    botonEliminar.dataset.accion = "eliminar";
    botonEliminar.dataset.indice = indice;
    botonEliminar.setAttribute("aria-label", `Eliminar: ${tarea.nombre}`);

    elemento.append(texto, botonCompletar, botonEliminar);
    listaTareas.appendChild(elemento);
  });

  actualizarResumen();
}

function cancelarTemporizadorDeshacer() {
  if (temporizadorDeshacer !== null) {
    clearTimeout(temporizadorDeshacer);
    temporizadorDeshacer = null;
  }
}

function restaurarTarea() {
  if (tareaEliminada === null) {
    return;
  }

  cancelarTemporizadorDeshacer();

  const { tarea, indice } = tareaEliminada;
  tareas.splice(indice, 0, tarea);
  tareaEliminada = null;

  mostrarTareas();
  mostrarMensaje("Tarea restaurada correctamente.");
}

function eliminarTarea(indice) {
  cancelarTemporizadorDeshacer();

  const tarea = tareas[indice];

  tareaEliminada = {
    tarea,
    indice,
  };

  tareas.splice(indice, 1);
  mostrarTareas();

  mensaje.replaceChildren();
  mensaje.append(document.createTextNode(`Se eliminó "${tarea.nombre}". `));

  const botonDeshacer = document.createElement("button");
  botonDeshacer.type = "button";
  botonDeshacer.classList.add("boton-deshacer");
  botonDeshacer.textContent = "Deshacer";
  botonDeshacer.addEventListener("click", restaurarTarea);

  mensaje.appendChild(botonDeshacer);

  temporizadorDeshacer = setTimeout(() => {
    tareaEliminada = null;
    temporizadorDeshacer = null;
    mostrarMensaje("La eliminación se ha confirmado.");
  }, 10000);
}

formTarea.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const texto = nombreTarea.value.trim();

  if (texto === "") {
    nombreTarea.setCustomValidity("Escribe el nombre de una tarea.");
    nombreTarea.reportValidity();
    return;
  }

  nombreTarea.setCustomValidity("");

  cancelarTemporizadorDeshacer();
  tareaEliminada = null;

  tareas.push(new Tarea(texto));

  mostrarTareas();
  mostrarMensaje("Tarea agregada correctamente.");

  formTarea.reset();
  nombreTarea.focus();
});

nombreTarea.addEventListener("input", () => {
  nombreTarea.setCustomValidity("");
});

listaTareas.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");

  if (!boton) {
    return;
  }

  const indice = Number(boton.dataset.indice);
  const accion = boton.dataset.accion;
  const tarea = tareas[indice];

  if (!tarea) {
    return;
  }

  if (accion === "completar") {
    tarea.completar();
    mostrarTareas();

    mostrarMensaje(
      tarea.completada
        ? `Tarea completada: ${tarea.nombre}.`
        : `Tarea reabierta: ${tarea.nombre}.`,
    );
  }

  if (accion === "eliminar") {
    eliminarTarea(indice);
  }
});

mostrarTareas();
