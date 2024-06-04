// ---------------------------- CONECTAR MONGODB -------------------------------
// const {MongoClient, ServerApiVersion} = require ("mongodb");

// NUEVA FORMA ECMAScript 6
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// EXPORTAR LA VARIABLE CLIENT PARA LLAMAR A MONGODB EN EL ARCHIVO MAIN.JS
// VOLVER ESA VARIABLE PUBLICA
export default client