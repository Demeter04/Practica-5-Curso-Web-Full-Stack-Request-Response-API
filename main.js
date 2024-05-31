// npm init -y initialize package.json
console.log("Hello world!");


// --------------------- END POINT --------------------

// FORMA ANTIGUA DE LLAMAR LIBRERIAS

// ------------------------ const express = require("express") ------------------------------------------------------------


// NUEVA FORMA DE LLAMAR LIBRERIAS con ECMAScript 6
// En Packaje.json  "type":"module" para importar librerias de esta nueva forma sin errrores
import express, { json, response } from "express"
import bodyParser from "body-parser";

const app = express()
const port = 3000 

app.use(bodyParser.json())



// ------------ IMPORTAR CLIENT MONGODB -------------------

import client from "./db.js";








//"/"  RUTA DE LA API PARA eL COMANDO CON EL QUE SEAN LLAMADOS (GET, PUSH, POST, PUT, DELETE) DE  LA FUNCION ADELANTE QUE SERA ANONIMA
            // como ruta de url ejemplo: /api/v2/pokemon

//FUNCION CALL BACK (Request and Response)
// parametro Req = request o peticion a la API
// Parametro Res = Response o respuesta de la API 

// ---------- TODA RESPUESTA ES EN JSON ----------

app.get('/api/v1/usuarios' , async (req,res) => {

    //  -------------------------------- CONECTAR A mONGODB --------------------------------
    await client.connect()

    //  -------------------------------- CONECTAR A NUESTRA DATABASE o Documento --------------------------------
    const dbSample_Mflix = client.db("sample_mflix")

    //  -------------------------------- ACCEDER A UNA COLLECTION  --------------------------------
    const userCollection = dbSample_Mflix.collection("users")

    //  ---------EJECUTAR LA CONSULTA DE ENCONTRAR, COMO NO SE ESPCF SE TRAEN TODOS LOS USUARIOS- == PEDIR QUE SE MUESTRE COMO UN ARRAY -----------------------
    const usersList = await userCollection.find({}).toArray()
    console.log(usersList)

    // -------------------- CERRAR LA CONEXION A DB -----------------

    await client.close()




/*     res.send("Mi primera peticion a una libreria o API") */
    
    /* const respuesta = {
        mensaje: "Hola",
    }

    res.json(respuesta) */

    res.json({  
        msg:"Lista de usuarios",
        nombre:"Oscar",
        contraseña:"1234",
        correo: "oss@gmail.com",
    
        // -------------- MOSTRAR LA REQUEST --------------------------

        data: usersList
    })
})

// CONSULTA GET MEDIANTE PARAMETROS UNICOS QUE SE ESCRIBAN EN LA RUTA

app.get("/api/v1/usuarios/:cedula" , (req,res ) => {

    console.log(req.params)
    const cedula = req.params.cedula

    res.json({
        mensaje:"obtener un usuario",
        SuUsuario:`${cedula}`
    })
} )


// POST - CREAR DATOS NUEVOS
app.post("/api/v1/usuarios", (req,res) =>{
   

    res.json({

        mensaje:"Usuario guardado",
    })
})

// PUT - ACTUALIZAR TODOS LOS DATOS DE UN ELEMENTO
app.put("/api/v1/usuarios/:cedula",(req,res) => {
   
    // PARAMS ES UN IDENTIFICADOR

    const cedula = req.params.cedula
    
    res.json({
        mensaje: `Se actualizo el usuario ${cedula}`,

    })
})

// PATCH - ACTUALIZAR PROPIEDADES O CAMPOS DE NUESTRO ELEMENTO


app.patch("/api/v1/usuarios/:cedula", (req,res) => {

    // PARAMS ES UN IDENTIFICADOR

    const cedula = req.params.cedula

    res.json({
        mensaje:`la clave se actualizo del Usuario ${cedula}`,
    })
})

// DELETE - eliminar un elemento
app.delete("/api/v1/usuarios/:cedula", (req,res) => {

    // PARAMS ES UN IDENTIFICADOR
    const cedula = req.params.cedula

    res.json({
        mensaje:`llUsuario se elemino ${cedula}`,
    })
})

// GET CON PARAMETROS LIMITADOS
// QUERYS, VARIABLEll de CLAVE - VALOR
// SE HACE CON REQ.QUERY 


app.get("/api/v1/perros",(req,res) => {
    
    console.log(req.query)
    const limit = parseInt(req.query.limite)
    console.log(limit)
    res.json({
        mensaje:"Lista de Perros",
    })

})

// ENVIAR INFORMACION A TRAVES DEL BODY
// METODO PATCH, CREAR
// BODY ES UN JSON QUE VA A LLEGAR A LA API

app.post("/api/v1/usuarios/crear", async (req,res) => {

    console.log(req.body)
    const NewUser =  req.body


    //  -------------------------------- CONECTAR A mONGODB --------------------------------
    await client.connect()

    //  -------------------------------- CONECTAR A NUESTRA DATABASE o Documento --------------------------------
    const dbSample_Mflix = client.db("sample_mflix")

    //  -------------------------------- ACCEDER A UNA COLLECTION  --------------------------------
    const userCollection = dbSample_Mflix.collection("users")


    //------------------------- ALMACENAR UN USUARIO --------------------------

    await userCollection.insertOne({
        NombreUsuario: NewUser.Nombre,
        EdadUsuario: NewUser.Edad,
        Clave: NewUser.clave,
        email: NewUser.email,
        //Ubicacion: NewUser.ubicacion
        Ubicacion:{
            latitud: NewUser.ubicacion.latitud,
            longitud: NewUser.ubicacion.longitud
        }
       
    })

    // ------------ CERRAR LA CONEXION --------------
    await client.close()

    res.json({
        mensaje:"Usuario Guardado",
    })

} )




// ENCENDER NUESTRA APLICACION, ESCUCHE NUESTRO PUERTO LOGICO 
// En el puerto 3000  y cuando se encienda nos mande el mensaje de 
// OTRA FUNCION CALLBACK ANONIMA
app.listen(port, () => {
    console.log(`Escuchando desde el puerto ${port}`)
} )



