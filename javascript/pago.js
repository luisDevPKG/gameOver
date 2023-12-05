const nombreJuego = document.querySelector("h2.card__title--st#titulo");
const precioFinal = document.querySelector("p.precio__juego--st#precioFinal");
const tipoCuenta = document.querySelectorAll("input.form-check-input");
const btnComprar = document.querySelector("button.btn__pago--sty#comprar");
const btnCart = document.querySelector("svg.nav-icon__img-sty");
const asesorButton = document.querySelector("button.btn__pago--sty#asesor");

const carrito = JSON.parse(localStorage.getItem("dataJuego")) || []

// obtengo el id del juego
function obtenerId (){
    const url = window.location.href;
    // busco el parametro id en la url
    const idUrl = new URLSearchParams(new URL(url).search).get('id').replace(/[^\d.]/g, '');
    const id = parseInt(idUrl, 10) // especifico la base en la que convierto el id a un entero
    return id
}

// obtengo el valor del checkbox seleccionado en el tipo cuenta
function checkboxValue(){
    let checkboxSeleccionado = null;

    tipoCuenta.forEach((opcion)=> {
        if(opcion.checked == true){
            checkboxSeleccionado = opcion.value;
        }
    });
    return checkboxSeleccionado;
}

// compra juego
function comprarJuego() {
    // obtengo el tipo de cuente seleccionada
    const cuentaSeleccionada = checkboxValue();

    // Validar si se seleccionó un tipo de cuenta
    if (cuentaSeleccionada === null) {
        // Mostrar la alerta Sweet indicando que falta el tipo de cuenta
        Swal.fire({
            icon: "warning",
            title: "Falta el tipo cuenta",
            text: "Por favor seleccione el tipo de cuenta, ya sea primaria o secundaria.",
            customClass: {
                icon: 'swal-icon-class',
                popup: 'swal-container-class',
                title: 'swal-title-class',
                htmlContainer: 'swal-html-container-class',
                confirmButton: 'swal-confirm-button-class'
            },
        });
        // Va a detener la ejecución de la función ya que falta el tipo de cuenta
        return;
    }

    let precioDef = null;
    // obtengo el texto del html
    precioDef = precioFinal.textContent;
    // capturo solo el valor numerico de la cadena
    precioDef = parseFloat(precioDef.replace(/[^\d.]/g, ''));

    // Buscar si el juego ya está en el carrito
    const juegoExistente = carrito.find(juego => juego.nombre === nombreJuego.textContent && juego.cuenta === cuentaSeleccionada);

    if (juegoExistente) {
        // Si el juego ya está en el carrito, actualizar la cantidad y el precio
        juegoExistente.cantidad++;
        juegoExistente.precio += precioDef;
        
    } else {
        // Si el juego no está en el carrito, agregar un nuevo elemento
        if (cuentaSeleccionada === "Primaria") {
            precioDef = precioDef;
        } else {
            precioDef = precioDef - 10;
        }

    // obtengo la información del juego y lo almaceno en el objeto dataJuego
    const dataJuego = {
        fecha: new Date(),
        id: obtenerId(),
        nombre: nombreJuego.textContent,
        cuenta: checkboxValue(),
        precio: precioDef,
        cantidad: 1
    };
    carrito.push(dataJuego);
    };

    localStorage.setItem("dataJuego", JSON.stringify(carrito));
    // Actualizo el contador en el botón de carrito
    actualizarContadorCarrito();

    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Se agregó al carrito de compras",
        showConfirmButton: false,
        timer: 1500
      });
}
btnComprar.addEventListener('click', () => comprarJuego());

// alerta asesor de ventas
function alertaAsesor(){
    Swal.fire({
        icon: "info",
        title: "Mantenimiento",
        text: "Nuestro canal de asesores en la página se encuentra offline, escribenos directamente. Disculpa las molestias",
        customClass: {
            icon: 'swal-icon-class',
            popup: 'swal-container-class',
            title: 'swal-title-class',
            htmlContainer: 'swal-html-container-class',
            confirmButton: 'swal-confirm-button-class'
        },
    });
}
asesorButton.addEventListener('click', alertaAsesor)

// Carrito compras
btnCart.addEventListener('click', ()=> {
    // redirigir al detalle del carrito de compras
    window.location.href = "../page/checkoutJuegos.html";
})
