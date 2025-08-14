import { Router } from 'express';
import {
  getIngredientesByReceta,
  addIngrediente,
  deleteIngrediente,
  getRecetasByIngrediente
} from '../controllers/ingredientesController.js';

const router = Router();

// Ver ingredientes de una receta (por slug)
router.get('/receta/:recetaSlug', getIngredientesByReceta);

// Agregar ingrediente a receta
router.post('/receta/:recetaSlug', addIngrediente);

// Eliminar ingrediente de receta
router.delete('/receta/:recetaSlug/:ingredienteSlug', deleteIngrediente);

// Buscar recetas por ingrediente
router.get('/buscar/:ingredienteSlug', getRecetasByIngrediente);

export default router;