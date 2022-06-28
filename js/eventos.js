//-------------------------------Eventos----------------------------------
const btnIngresar = document.getElementById("ingresar-btn");
btnIngresar.addEventListener("click", mostrarMenu);


const btnPeliculas =document.getElementById("peliculas-btn");
btnPeliculas.addEventListener("click", comprarPelicula);

const btnAlimentos =document.getElementById("alimentos-btn");
btnAlimentos.addEventListener("click", comprarAlimentos);

const btnCarrito = document.getElementById("carrito-btn");
btnCarrito.addEventListener("click", verCarrito);

const btnAtras = document.getElementById("atras-btn");
btnAtras.addEventListener("click", atrasMenu);