// ---------------------------- CONECTAR MONGODB -------------------------------
// const {MongoClient, ServerApiVersion} = require ("mongodb");

// NUEVA FORMA ECMAScript 6
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Oscar_Urrego:oscar1234@curso-web-full-stack.roft1hd.mongodb.net/?retryWrites=true&w=majority&appName=Curso-Web-Full-Stack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client