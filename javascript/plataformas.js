// Obtengo la referencia del elemento del select
let opcionSelect = document.getElementById("plataformas");

// se define evento para el cambio hacia la opcion seleccionada
opcionSelect.addEventListener("change", function () {
    // obtengo la opcion seleccionada
    let opcionEscogida = opcionSelect.value;

    // Valido si se escogió una opción -- es decir, si no está vacío
    if (opcionEscogida) {
        // se redirige a la opcion que escogió
        window.location.href = opcionEscogida;
    }
});