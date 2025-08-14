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
router.post("/create", async function (req, res) {
  try {
    const { id, titulo, clientID, descripcion, ingredientes } = req.body;
    if (!id || !nombre || !habilidad || !descripcion || !ingredientes === undefined) {
      res.status(400).json({ error: "Invalid asdasdsadsad!" });
    }
    const receta = {
      id,
      clientID,
      titulo,
      descripcion,
      ingredientes
    };
    await getDB().collection("recetas").insertOne(receta);
    res.status(201).json({ message: "Receta created!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal servasdasdsadasdsaer error" });
  }
});


export default router;