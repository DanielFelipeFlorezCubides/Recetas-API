import { getDB } from "../db/config.js";

// Obtener todos los ingredientes de una receta
export async function getIngredientes(req, res) {
  try {
    const idReceta = parseInt(req.params.idReceta);
    const receta = await getDB().collection("recetas").findOne({ id: idReceta });

    if (!receta) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    res.status(200).json(receta.ingredientes || []);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}

// Agregar un ingrediente a una receta
export async function addIngrediente(req, res) {
  try {
    const idReceta = parseInt(req.params.idReceta);
    const { id, nombre } = req.body;

    if (!id || !nombre) {
      return res.status(400).json({ error: "Datos de ingrediente inválidos" });
    }

    const result = await getDB().collection("recetas").updateOne(
      { id: idReceta },
      { $push: { ingredientes: { id, nombre } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    res.status(201).json({ message: "Ingrediente agregado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}

// Eliminar un ingrediente de una receta
export async function deleteIngrediente(req, res) {
  try {
    const idReceta = parseInt(req.params.idReceta);
    const idIngrediente = parseInt(req.params.idIngrediente);

    const result = await getDB().collection("recetas").updateOne(
      { id: idReceta },
      { $pull: { ingredientes: { id: idIngrediente } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Ingrediente no encontrado en la receta" });
    }

    res.status(200).json({ message: "Ingrediente eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}

// Buscar recetas por nombre de ingrediente
export async function buscarRecetasPorIngrediente(req, res) {
  try {
    const nombreIngrediente = req.params.nombreIngrediente.toLowerCase();

    const recetas = await getDB()
      .collection("recetas")
      .find({ "ingredientes.nombre": { $regex: nombreIngrediente, $options: "i" } })
      .toArray();

    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}