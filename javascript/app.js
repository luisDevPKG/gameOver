const opcionSelect = document.querySelector("select.form-select#plataformas");

// agrego un evento de cambio dependiendo de la opcion marcada en el select
opcionSelect.addEventListener("change", ()=> {
    // obtengo la opcion seleccionada
    let plataformaSeleccionada = opcionSelect.value;

    // Valido si se escogió una opción -- es decir, si no está vacío
    if (plataformaSeleccionada) {
        // se redirige a la opcion que escogió
        window.location.href = plataformaSeleccionada;
    }
})

// obtengo la url de la pagina
function obtenerUrl(){
    //obtengo la url
    return window.location.href
}

// Se muestra las cards de los diferentes juegos en base a la plataforrma escogida
function mostrarJuegos(plataforma) {
    const url = obtenerUrl();
    url.endsWith("playstation.html") ? plataforma.mostrarJuegosPlayStation() : plataforma.mostrarJuegosXbox();
}

// Obtiene las cards de los juegos que se buscan
function buscar(plataforma) {
    // obtengo la data ingresada en el input de buscar y la transformo todo en miniscula
    const inputBusqueda = document.querySelector("input.form-control#buscar").value.trim().toLowerCase();

    // Valido si estoy en plataforma playstation o xbox
    const url = obtenerUrl();
    const plataformaNombre = url.endsWith("playstation.html") ? "PlayStation" : "Xbox";

    // Obtengo los juegos según la plataforma
    const juegosInfo = plataformaNombre === "PlayStation" ? plataforma.playstationGames : plataforma.xboxGames;

    // Filtro los juegos que coincidan con la busqueda
    const juegoFiltrado = juegosInfo.filter((juego) => {
        return juego.titulo.toLowerCase().includes(inputBusqueda)
    });

    plataforma.mostrarJuegosFiltrados(juegoFiltrado);
}
