// npm init -y initialize package.json
console.log("Hello world!");


// --------------------- END POINT --------------------

const express = require("express")
const app = express()
const port = 3000 

app.get('/' //"/"  RUTA DE LA API PARA eL COMANDO  (GET, PUSH, POST, PUT, DELETE) DE  LA FUNCION ADELANTE QUE SERA ANONIMA
            // como ruta de url ejemplo: /api/v2/pokemon

//FUNCION CALL BACK (Request and Response)
// parametro Req = request o peticion a la API
// Parametro Res = Response o respuesta de la API
, (req,res) => {
    res.send("Mi primera peticion a una libreria o API")   
})

// ENCENDER NUESTRA APLICACION, ESCUCHE NUESTRO PUERTO LOGICO 
// En el puerto 3000  y cuando se encienda nos mande el mensaje de 
// OTRA FUNCION CALLBACK ANONIMA
app.listen(port, () => {
    console.log(`Escuchando desde el puerto ${port}`)
} )