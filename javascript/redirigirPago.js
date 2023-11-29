const asesorButton = document.querySelector("button.btn__pago--sty#asesor")

// Redirige a la pagina de pago del juego al hacer clic directamente en el boton comprar
function redirigePago(id){
    // ubico a la pagina a la que quiero redirigir
    window.location.href = "../page/pago.html?id=" + id;
}

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
asesorButton.addEventListener('click', ()=> alertaAsesor())