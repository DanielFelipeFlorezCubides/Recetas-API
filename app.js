import dotenv from "dotenv";
import express from "express";
import recetaRouter from "./routers/recetaRouter.js"
import { connect } from "./db/config.js";

dotenv.config();

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use("/receta", recetaRouter);

app.get("/home", function(req, res){
    res.send("API DE RECETAS FUNCIONANDO CORRECTAMENTE, intercambia el /home por /receta")
})

connect().then(() =>{
    app.listen(port, ()=>{
        console.log("http://localhost:" + port + "/home");
        
    })  
})