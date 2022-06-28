// -------------Clase Pelicula----------------------------------

class Pelicula{
    constructor(id, nombre, sipnosis, puntuacion, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.sipnosis = sipnosis;
        this.puntuacion = puntuacion;
        this.precio = precio;
        this.imagen = imagen;
    }
}

//---------Clase Producto--------------------------------------

class Alimento{
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;        
    }
}

//-------------Clase Compra-------------------------------------

class Compra{
    constructor(tipo, producto, cantidad){
        this.tipo = tipo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.subtotal = Number(this.producto.precio) * Number(this.cantidad);
    }
}

//------CLASE CARRITO--------------------------------------------------

class Carrito{
    constructor(){
        this.compras = Array(0);
        this.total = 0;
    }

    incluirEnCarrito(compra){
        this.compras.push(compra);
    }
    
    listarProductos(){
        //Operador Spread-------------
        let organizado = {...this};
        
        organizado.compras.sort((a,b)=>{
            if(a.tipo>b.tipo){
                return -1;
            }
            if(a.tipo<b.tipo){
                return 1;
            }
            return 0;
        });
        return organizado;
    }

    calcularTotal(){
        this.total=0;
        this.compras.forEach((elemento)=>{
            this.total += Number(elemento.subtotal);
        } );

        return this.total;
    }
}