// Defino una clase video juego que me va a mostar la informacion
class VideoJuegoInfo {

    // establezco los parametros de la clase
    id = null;
    imagen = null;
    nombre = null;
    descripcion = null;
    voces = null;
    textos = null;
    peso = null;
    genero = null;
    precioReal = null;
    descuento = null;
    precioFinal = null;
    plataforma = null;

    // establezco el constructor para cada card
    // adentro identifico el id (a partir de un query string) para en base a este id pintar la informacion o crear el objeto VideoJuegoInfo
    constructor(){
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');
    }

    // metodo que me va a mostrar la informacion en el html
    mostrarInfo(){
        // obtengo los elementos del html para mostrar la informacion
        const img = document.querySelector("img.img--juego#imagen");
        const titulo = document.querySelector("h2.card__title--st#titulo");
        const descripcion = document.querySelector("p.card__text--st#descripcion");
        const voces = document.querySelector("p.text__caracteristica--st#voces");
        const textos = document.querySelector("p.text__caracteristica--st#textos");
        const peso = document.querySelector("p.text__caracteristica--st#peso");
        const genero = document.querySelector("p.text__caracteristica--st#genero");
        const precioReal = document.querySelector("p.precio__descuento--st#precioReal");
        const descuento = document.querySelector("p.porcentaje__descuento--st#descuento");
        const precioFinal = document.querySelector("p.precio__juego--st#precioFinal");
        const plataforma = document.querySelector("p.text__plataforma--st#plataforma");


        // Asigno los valores a cada elemento html
        img.src = this.imagen;
        titulo.textContent = this.nombre;
        descripcion.textContent = this.descripcion;
        voces.textContent = "Voces: " + this.voces;
        textos.textContent = "Textos: " + this.textos;
        peso.textContent = this.peso;
        genero.textContent = this.genero;
        precioReal.textContent = "$" + this.precioReal + " USD";
        descuento.textContent = this.descuento + "%";
        precioFinal.textContent = "$" + this.precioFinal + " USD";
        plataforma.textContent = this.plataforma;

    }

    // metodo que va a cargar la informacion de cada juego
    cargarJuego() {
    
        let juegos;
        // cargo la informacion del JSON de forma asincronica
        fetch ('../javascript/videojuegos.json')
        .then(response => response.json())
        .then(data => {
    
        // accedo a los datos del archivo json
        // El método find lo utilizo para buscar el objeto en juegos con el id que coincida con el id obtenido del constructor.
        juegos = data.juegos.find((j)=> {
            return j.id == this.id;
        });

        // asigno cada indice encontrado en el json de juegos a su parametro correspondiente
        this.imagen = juegos.img;
        this.nombre = juegos.titulo;
        this.descripcion = juegos.descripcion;
        this.voces = juegos.voces;
        this.textos = juegos.textos;
        this.peso = juegos.peso;
        this.genero = juegos.genero;
        this.precioReal = juegos.precio;
        this.descuento = juegos.descuento;
        this.precioFinal = parseFloat(this.precioReal) - parseFloat((this.precioReal) * (this.descuento/100));
        this.plataforma = juegos.plataforma;
        // pinto lada data en el html de acuerdo al indice obtenido por cada id
        this.mostrarInfo();
    
        })
        .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        });
    }
}

// instancio objetos de la clase VideoJuegoInfo
const vidoJuego = new VideoJuegoInfo();
// llamo el metodo que me obtiene la informacion de cada juego
vidoJuego.cargarJuego();

