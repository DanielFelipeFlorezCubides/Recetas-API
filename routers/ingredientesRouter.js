import { Router } from "express";
import {
  getIngredientes,
  addIngrediente,
  deleteIngrediente,
  buscarRecetasPorIngrediente
} from "../controllers/ingredientesController.js";

const router = Router();

router.get("/:idReceta/ingredientes", getIngredientes);
router.post("/:idReceta/ingredientes", addIngrediente);
router.delete("/:idReceta/ingredientes/:idIngrediente", deleteIngrediente);
router.get("/buscar/:nombreIngrediente", buscarRecetasPorIngrediente);

export default router;