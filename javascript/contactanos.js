const form = document.querySelector("form.formulario-informacion")
const nombreUsuario = document.querySelector("input.form-control#nombre");
const apellidoUsuario = document.querySelector("input.form-control#apellido");
const emailUsuario = document.querySelector("input.form-control#email");
const telefonoUsuario = document.querySelector("input.form-control#telefono");
const esNuevo = document.querySelectorAll("input.form-check-input");
const opinionUsuario = document.querySelector("textarea.form-control#opinionUsuario");
const botonEnviar = document.querySelector("button.btn#botonForm")

// obtengo el valor del checkbox seleccionado en el formulario de Contactanos
function checkboxValue(){

    let checkboxSeleccionado = null;

    esNuevo.forEach((opcion)=> {
        if(opcion.checked == true){
            checkboxSeleccionado = opcion.value;
        }
    })

    return checkboxSeleccionado;
}

// almacena en el localStore la informacion suministrada por el usuario en el formulario de Contactanos
function guardarDatosUsuario(){

    // obtengo los valores del formulario y lo almaceno en el objeto dataUsuario
    const dataUsuario = {
        fecha: new Date(),
        nombre: nombreUsuario.value,
        apellido: apellidoUsuario.value,
        email: emailUsuario.value,
        telefono: telefonoUsuario.value,
        usuarioNuevo: checkboxValue(),
        opinion: opinionUsuario.value
    }

    //validacion formulario lleno
    let elementos_form = form.elements;

    // Itero sobre los elementos del formulario para validar que NO estén vacios
    for (let i = 0; i < elementos_form.length; i++) {

        if (elementos_form[i].type !== "button" && elementos_form[i].value.trim() === ""){
            Swal.fire({
                icon: "warning",
                title: "Ops...",
                text: "El formulario no puede estar vacío, por favor llena la información.",
                customClass: {
                    icon: 'swal-icon-class',
                    popup: 'swal-container-class',
                    title: 'swal-title-class',
                    htmlContainer: 'swal-html-container-class',
                    confirmButton: 'swal-confirm-button-class'
                },
            });
            return false;
        } else {
            Swal.fire({
                icon: "success",
                title: "Hemos recibido tus comentarios",
                text: "Gracias por preferirnos, tu solicitud se respondera en breve.",
                customClass: {
                    popup: 'swal-container-class',
                    title: 'swal-title-class',
                    htmlContainer: 'swal-html-container-class',
                    confirmButton: 'swal-confirm-button-class'
                },
            });

            // setea el formulario
            form.reset();
            localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario))
            return true
        }
    }
}
botonEnviar.addEventListener('click', ()=> guardarDatosUsuario())
