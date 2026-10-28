# Auditoría UX — App de tareas

Listado de notas de tareas a realizar redisenado aplicando principios de UX/UI.

Página publicada: https://Mcmcmc07.github.io/taller-ux/app-notas/

## 1. Objetivo

Evaluar la interfaz original de `app-notas` mediante las cinco heurísticas de Nielsen e identificar mejoras para facilitar el uso de la aplicación, prevenir errores y mejorar su accesibilidad.

## 2. Auditoría de las cinco heurísticas

| Heurística                                       | Problema de la interfaz original                                                                                   | Solución aplicada                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Visibilidad del estado del sistema               | No se muestra un mensaje al completar o reabrir una tarea.                                                         | Mostrar un mensaje visible después de cada acción realizada.                                |
| Correspondencia entre el sistema y el mundo real | No se muestra un resumen de las tareas pendientes y completadas.                                                   | Incorporar un resumen con términos familiares para el usuario.                              |
| Control y libertad del usuario                   | La eliminación de una tarea es inmediata y no permite recuperarla.                                                 | Incorporar una opción para deshacer la eliminación.                                         |
| Consistencia y estándares                        | Los estilos de los mensajes se asignan directamente desde JavaScript y no hay estilos personalizados para el foco. | Centralizar los colores en variables CSS y mantener estilos consistentes y un foco visible. |
| Prevención de errores                            | El campo permite intentar enviar una tarea vacía y no tiene una etiqueta visible.                                  | Incorporar `label`, `required` y validación previa al registro de la tarea.                 |

## 3. Aplicación de las leyes de diseño

| Ley           | Problema identificado                                                                                      | Solución propuesta                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Ley de Fitts  | Los botones no tienen una altura mínima garantizada y las acciones podrían ser más fáciles de seleccionar. | Establecer una altura mínima de 44 px para los botones y mantener una separación adecuada entre ellos. |
| Ley de Hick   | Las acciones disponibles en cada tarea pueden competir por la atención del usuario.                        | Diferenciar visualmente las acciones principales y secundarias para facilitar la elección.             |
| Ley de Miller | La interfaz no presenta un resumen de las tareas pendientes y completadas.                                 | Incorporar un resumen breve que facilite la comprensión de la información sin recargar la pantalla.    |

## 4. Accesibilidad

Se revisarán las etiquetas de los campos, el contraste de los textos, el foco visible, la navegación mediante teclado y el tamaño de los botones. Como la interfaz original no contiene imágenes, el atributo `alt` se comprobará si se incorporan imágenes durante el rediseño.

## 5. Evidencias de Lighthouse

### Antes del rediseño

- **Puntaje de Accesibilidad:** 97/100.

### Después del rediseño

- **Puntaje de Accesibilidad:** 100/100.

## 6. Resultado final

Esta sección se completará después de implementar las mejoras, comprobar la navegación con teclado y verificar que el puntaje de Accesibilidad de Lighthouse sea de 100.
