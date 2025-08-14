import {Router} from "express";
import { getDB } from "../db/config.js";

const router = Router()

router.get("/getall", async function (req, res) {
    try{
        const recetas = await getDB().collection("recetas").find().toArray()
        res.status(200).json(recetas)
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
})
router.get("/get/:id", async function (req, res) {
  try {
    const idReceta = parseInt(req.params.id);
    const receta = await getDB().collection("recetas").findOne({ id: idReceta });
    if (!receta) {
      res.status(404).json({ error: "Receta doesn't exists!" });
    }
    res.status(200).json(receta);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// POST CREAR RECETA
router.post("/create", async function (req, res) {
  
    const { id, titulo, clientID, descripcion, ingredientes } = req.body;
     /* console.log(req.body);  */
    
    if (!id || !titulo || !clientID || !descripcion || !ingredientes === undefined) {
      res.status(400).json({ error: "Invalid asdasdsadsad!" });
    }
    const receta = {
      id: id,
      clientID: clientID,
      titulo: titulo,
      descripcion: descripcion,
      ingredientes: ingredientes
    };
    const response = await getDB().collection("recetas").insertOne(receta);
    console.log(response);
    
    res.status(201).json({ message: "Receta created!!" });
  
});


export default router;