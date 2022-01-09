//librerias 
const Contenedor = require("./Modulos/Contenedor.js"); //clase contenedor que trae productos
const express = require("express"); // libreria para crear servidor

//funcion aleatoria --> https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

//creo servidor
const server = express(); // se suele poner a la variable app o server
const PORT = 8080;

//creo objeto con los datos de productos.txt
const contenedorProductos = new Contenedor("./productos.txt");

//PRINCIPAL
server.get("/",(request,response)=>response.send("Desafio Clase 06"));

// PRODUCTOS
server.get("/productos", (request,response) => {
    contenedorProductos.getAll()
      .then((listadoProductos) => response.send(listadoProductos))
      .catch((error) => console.error(error.message));
  });
   

// PRODUCTO RANDOM
server.get("/productoRandom", (request,response) => {
    contenedorProductos.getAll()
    .then(async (listadoProductos) =>{
        //obtengo un numero al azar tomando en cuenta la cantidad q hay en el archivo
        let nroRandom = getRandomInt(1, listadoProductos.length);
        //devuelvo el producto con el id = al numero obtenido al azar
        response.send(await contenedorProductos.getById(nroRandom));
    })
    .catch((error) => console.error(error.message));
})

//expongo el servidor creado al http
const connectedServer = server.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${connectedServer.address().port}`);
})
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));

//para probar voy al navegador y pongo http://localhost:8080