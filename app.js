import dotenv from "dotenv";
import express from "express";
import recetaRouter from "./routers/recetaRouter"
import { connect } from "./db/config";

dotenv.config();

const port = process.env.PORT || 5500
const app = express()

app.use("/receta", recetaRouter);

app.get("/home", function(req, res){
    res.send("API DE RECETAS FUNCIONANDO CORRECTAMENTE, intercambia el /home por /receta")
})

connect().then(() =>{
    app.listen(port, ()=>{
        console.log("http://localhost:"+ port + "/home");
        
    })
})