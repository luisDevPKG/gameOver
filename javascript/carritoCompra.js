const detalleCarrito = document.querySelector("table tbody");
const totalCarrito = document.querySelector("td#totalCarrito");
const btnFinCompra = document.querySelector("button.btn__comprar--cart#finalizarcompra");
const btnReturn = document.querySelector("button.btn__seguircomprando--sty");


const carrito = JSON.parse(localStorage.getItem("dataJuego")) || []


// Crear filas en html de forma dinamica
function filasHtml(juego){
    return `<tr>
                <td>${juego.cantidad}</td>
                <td>${juego.nombre}</td>
                <td>${juego.cuenta}</td>
                <td>$${juego.precio.toFixed(2)} USD</td>
                <td>
                    <button class="btn__remove--st">Remover</button>
                </td>
            </tr>`
}

// se carga la tabla con la informacion del carrito
function cargaJuegosCarrito() {
    if (carrito.length > 0) {
        // seteo el html
        detalleCarrito.innerHTML = ""
        // leo el array e itero por cada objeto juego
        carrito.forEach((juego) => {
            detalleCarrito.innerHTML += filasHtml(juego)
        })
        precioTotalCarrito()
    } else {
        precioTotalCarrito()
    }
}

// actualiza el precio total del carrito conforme a la cantidad de juegos
function precioTotalCarrito() {
    if (carrito.length > 0) {
        let totalDetalles = carrito.reduce((acc, juego) => acc + juego.precio, 0);
        totalCarrito.textContent = `$ ${totalDetalles.toFixed(2)} USD`;
    } else {
        totalCarrito.textContent = "$ 0.00 USD";
    }
}

// llamo la funcion para mostrar la informacion del carro de compras
cargaJuegosCarrito()

// Agrego un evento de clic a los botones "Remover"
detalleCarrito.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn__remove--st')) {
        // obtengo la fila del juego a remover
        const fila = e.target.closest('tr');
        
        // Obtengo el índice del juego a remover en el carrito
        const index = Array.from(detalleCarrito.children).indexOf(fila);

        // Elimino el juego del HTML y del local storage
        if (index !== -1) {
            const juego = carrito[index];
            if (juego.cantidad > 1 ){
                juego.cantidad -= 1;
            } else {
                // Si la cantidad es 1, elimino el juego del carrito
                detalleCarrito.removeChild(fila);
                carrito.splice(index, 1);
            }

            actualizarCarrito();
            cargaJuegosCarrito(); // Actualizo la tabla
            precioTotalCarrito();
        }
    }
});
// guardo la informacion del carrito en el localStorage
function actualizarCarrito() {
    localStorage.setItem('dataJuego', JSON.stringify(carrito));
}

// confirmacion de compra realizada
btnFinCompra.addEventListener('click', () => {

    if (carrito.length > 0){
        Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Compra realizada con exito",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            //recargar pagina
            location.reload();
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Carrito de compras vacío",
            text: "No se puede realizar compra porque no hay productos en el carrito.",
            customClass: {
                icon: 'swal-icon-class',
                popup: 'swal-container-class',
                title: 'swal-title-class',
                htmlContainer: 'swal-html-container-class',
                confirmButton: 'swal-confirm-button-class'
            },
        });
    }
    // limpio el local storage
    localStorage.removeItem("dataJuego");

    // actualizar el precio
    precioTotalCarrito();

    // actuallizo la cantidad en el icono de carrito de compras
    actualizarContadorCarrito();

    // limpio el contenido de la tabla después de finalizar la compra
    detalleCarrito.innerHTML = "";
    totalCarrito.textContent = "$ 0.00 USD";
})
btnFinCompra.addEventListener("mouseover", ()=> {
    btnFinCompra.title = "Click aqui para finalizar tu compra"
});
btnReturn.addEventListener("mouseover", ()=> {
    btnReturn.title = "Volver a la plataforma playstation"
});