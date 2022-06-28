//------------------MAIN------------------------------------------------------------------

const carrito = new Carrito();

const peliculas = new Array();
cargarPeliculasPopulares();

const alimentos = new Array();
cargarDatosAlimentos();


//--------------------FUNCIONES-----------------------------------------------
//-----------------------------------API---------------------------------
//Fetch API Peliculas
async function cargarPeliculasPopulares(){
    const BASEurl = 'https://api.themoviedb.org/3';
    const APIKEY = '8d3b809e88a7b8862f933ad6977f84f0';
    const URL = `${BASEurl}/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}`; //Peliculas Populares

    const respuesta = await fetch (URL);
    const datos = await respuesta.json();
    datos.results.forEach((pelicula)=>{
        pelicula.poster_path = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    });
    const {results}=datos;//Destructurar array de peliculas
    crearPeliculasObjects(results);
}

function crearPeliculasObjects(array){
    console.log(array)
    array.forEach((movie)=>{
        const pelicula = new Pelicula(movie.id, movie.title, movie.overview, movie.vote_average, 12.99, movie.poster_path );
        peliculas.push(pelicula);
    });
}

async function cargarDatosAlimentos(){
    const respuesta = await fetch('./src/alimentos.json');
    const data = await respuesta.json();
    
    crearAlimentosObjects(data);
}

function crearAlimentosObjects(array){
    console.log(array);
    array.forEach((producto)=>{
        const alimento = new Alimento(producto.id, producto.nombre, producto.precio, producto.imagen );
        alimentos.push(alimento);
    });
}

//------------------------------------DOM----------------------------------------
function mostrarMenu(){

    const menu= document.getElementById("menu");
    menu.classList.replace("invisible", "visible");

    const boton = document.getElementById("ingresar-btn");
    boton.classList.replace("visible", "invisible");
}

function atrasMenu(){
    const nodo= document.getElementById("shopping");
    nodo.remove();

    const boton=document.getElementById("atras-btn");
    boton.classList.replace("visible", "invisible");
}

function comprarPelicula(){

    const shop = document.createElement("div");
    shop.classList.add("container-fluid","position-absolute", "top-50" ,"start-50", "translate-middle", "visible", "shopping");
    shop.setAttribute("id", "shopping");
    shop.innerHTML=`<h2>Peliculas en Cartelera</h2>
                    <div class="shop" id="peliculaShop">
                    
                    </div>`;
    const main= document.getElementById("main");
    main.appendChild(shop);
    const boton = document.getElementById("atras-btn");
    boton.classList.replace("invisible", "visible");

    const nodo=document.getElementById("peliculaShop");

    peliculas.forEach((pelicula)=>{
        const card= document.createElement("div");
        card.classList.add("card","mb-3");
        mostrarFrentePeli(card, pelicula);
        nodo.appendChild(card);

    });
}

function comprarAlimentos(){

    const shop = document.createElement("div");
    shop.classList.add("container-fluid","position-absolute", "top-50" ,"start-50", "translate-middle", "visible", "shopping");
    shop.setAttribute("id", "shopping");
    shop.innerHTML=`<h2>Zona de Comidas</h2>
                    <div class="shop" id="comidaShop">
                    
                    </div>`;
    const main= document.getElementById("main");
    main.appendChild(shop);
    const boton = document.getElementById("atras-btn");
    boton.classList.replace("invisible", "visible");

    const nodo=document.getElementById("comidaShop");
    alimentos.forEach((alimento)=>{
        const card= document.createElement("div");
        card.classList.add("card","mb-3");
        mostrarFrenteAlimento(card, alimento);
        nodo.appendChild(card);

        cardButon = card.getElementsByClassName("img-card");
        cardButon[0].addEventListener("click", ()=>{mostrarReverso(card, alimento)});
        
    });
}

//Operador OR en los atributos pelicula.
//Destructuracion objeto pelicula
function mostrarFrentePeli(card, pelicula){
    const {imagen, nombre, sipnosis, precio, puntuacion} = pelicula;
    card.innerHTML=`<div class="row g-0">
                            <div class="col-md-4">
                                <img src="${imagen  || 'proximamente.webp'}" class="img-fluid rounded-start img-card" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text text-truncate">Sipnosis: ${sipnosis || "Proximamente"}</p>
                                <p class="card-text">Puntuacion: ${puntuacion || 5.0}</p> 
                                <p class="card-text">Precio: $${precio || 5.0}</p>                               
                                </div>
                            </div>
                        </div>`;
    const cardButon = card.getElementsByClassName("img-card");
    cardButon[0].addEventListener("click", ()=>{mostrarReverso(card, pelicula)});
}

//Operador OR en imagen alimento
//Destructuracion objeto alimento
function mostrarFrenteAlimento(card, alimento){
    const{imagen, nombre, precio}= alimento;
    card.innerHTML=`<div class="row g-0">
                            <div class="col-md-4">
                                <img src="${imagen || 'popcorn-sample.webp'}" class="img-fluid rounded-start img-card" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">Precio: $${precio || 0.0}</p>                                
                                </div>
                            </div>
                        </div>`;
    const cardButon = card.getElementsByClassName("img-card");
    cardButon[0].addEventListener("click", ()=>{mostrarReverso(card, alimento)});
}

//Operador OR en imagen producto
function mostrarReverso(card, producto){
    const {imagen, nombre}= producto;
    card.innerHTML=`<div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imagen || 'popcorn-sample.webp' }" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <input type="number" min="0" class="cantidad" placeholder="Cantidad">
                                <button type="button" class="btn btn-danger btn-outline-light">Agregar</button>                                    
                            </div>
                        </div>
                    </div>`;
    

    const agregar = card.getElementsByClassName("btn-danger");
    agregar[0].addEventListener("click",()=>{agregarCarrito(card, producto)});
}

function agregarCarrito(card, producto){
    const input = card.getElementsByClassName("cantidad");
    const cantidad = input[0].value;
    let tipo =""

    if (cantidad>0){
        let encontrado = carrito.compras.find((compra)=>compra.producto.nombre===producto.nombre);
        console.log(encontrado?.producto?.nombre || "No encontrado");

        if (typeof encontrado !== 'undefined' ){
            Swal.fire({
                title: "Error",
                text: "Ya esta en el carrito",
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
            })
            comprobarTipoProducto(card, producto);
        }
        else{
            tipo = comprobarTipoProducto(card, producto);

            const compra = new Compra(tipo, producto, cantidad);
            carrito.incluirEnCarrito(compra);
            
            //SweetAlert
            Swal.fire({
                title: "Agregado a Carrito",
                text: `${producto.nombre} x ${cantidad} ha sido agregado al carrito`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            })
        }        

    }
    else{
        // alert("No es una cantidad válida");
        Swal.fire({
            title: "Error",
            text: "No es una cantidad válida",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
        })
    }
    //Guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(carrito.compras));
}

function comprobarTipoProducto(card, producto){
    let tipo ="";
    if (producto instanceof Pelicula){
        tipo="Pelicula";
        mostrarFrentePeli(card, producto);      
    }
    else if(producto instanceof Alimento){
        tipo="Alimento";
        mostrarFrenteAlimento(card, producto); 
    }
    return tipo;
}

function verCarrito(){

    //Recuperar elementos del localStorage
    if(localStorage.getItem("productos")){
        carrito.compras= JSON.parse(localStorage.getItem("productos"));
    }
    //------------------------------------------

    let shop = document.getElementById("shopping");
    if(!shop){
        shop = document.createElement("div");
        shop.classList.add("container-fluid","position-absolute", "top-50" ,"start-50", "translate-middle", "visible", "shopping");
        shop.setAttribute("id", "shopping");
    }
    else{
        shop.innerHTML="";
    }    
    //Operador SPREAD (ver declaracion de la clase)
    let organizado = carrito.listarProductos();

    shop.innerHTML=`<h2>Carrito de Compras</h2>
                    <div class="container-fluid">
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaCompras">

                                
                            </tbody>
                        </table>
                    </div>
                    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
                        <h3>TOTAL = $${carrito.calcularTotal()}</h3>
                        <button type="button" onclick="finalizarCompra()" class="btn btn-danger btn-outline-light btn-lg id="finalizar">Finalizar Compra</button>
                    </div>`;
    const main= document.getElementById("main");
    main.appendChild(shop);

    const boton = document.getElementById("atras-btn");
    boton.classList.replace("invisible", "visible");

    const tabla = document.getElementById("tablaCompras");
    let n = 1;
    organizado.compras.forEach((compra)=>{
        const fila = document.createElement("tr");
        fila.innerHTML=`<th scope="row">${n}</th>
                        <td class="item"><img src="${compra.producto.imagen}" alt=""></td>
                        <td>${compra.tipo || 'Producto'}</td>
                        <td>${compra.producto.nombre}</td>
                        <td>$${compra.producto.precio}</td>
                        <td>${compra.cantidad}</td>
                        <td>$${compra.subtotal}</td>
                        <td><button type="button" class="btn btn-danger btn-outline-light btn-sm">Eliminar</button></td>`
        tabla.appendChild(fila);

        const btnEliminar =fila.getElementsByClassName("btn-danger");
        btnEliminar[0].addEventListener("click", ()=>{eliminarProducto(compra)});
        n++; //operador ++
    });
}

function eliminarProducto(producto){

    let encontrado = carrito.compras.find((compra)=>compra.id===producto.id);
    let index = carrito.compras.indexOf(encontrado);
    carrito.compras.splice(index,1);

    //Guardar en LocalStorage
    localStorage.setItem("productos", JSON.stringify(carrito.compras));

    const shopping= document.getElementById("shopping");
    shopping.remove();
    verCarrito();    
}


function finalizarCompra(){

    Swal.fire({
        title: 'Esta seguro de finalizar?',
        text: `Su total a pagar es: $${carrito.total}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Finalizar!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Gracias por su Compra",
                imageUrl: './img/cinema-shop.gif',
                imageWidth: 400,
                imageHeight: 400,
                showConfirmButton: false,
                timer: 4000,
        
            });

            const shop=document.getElementById("shopping");
            shop.remove();
            const menu=document.getElementById("menu");
            menu.classList.replace("visible", "invisible");
            const btnAtras = document.getElementById("atras-btn");
            btnAtras.classList.replace("visible", "invisible");

            
            const boton = document.getElementById("ingresar-btn");
            boton.classList.replace("invisible", "visible");

            carrito.compras.splice(0,carrito.compras.length);

            //Limpiar LocalStorage
            localStorage.clear();
        }
    });    
}









