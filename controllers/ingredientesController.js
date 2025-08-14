import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.DB_URI);
const dbName = process.env.DB_NAME;

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
}

// Obtener ingredientes de una receta por slug
export const getIngredientesByReceta = async (req, res) => {
  const { recetaSlug } = req.params;
  try {
    await client.connect();
    const db = client.db(dbName);

    const user = await db.collection('users').findOne(
      { 'recetas.slug': recetaSlug },
      { projection: { 'recetas.$': 1 } }
    );

    if (!user || !user.recetas.length) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.json(user.recetas[0].ingredientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar ingrediente con validación para evitar duplicados
export const addIngrediente = async (req, res) => {
  const { recetaSlug } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre del ingrediente es obligatorio' });
  }

  const ingredienteSlug = slugify(nombre);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Verificar si el ingrediente ya existe en la receta
    const recetaExiste = await db.collection('users').findOne(
      { 'recetas.slug': recetaSlug, 'recetas.ingredientes.slug': ingredienteSlug },
      { projection: { _id: 1 } }
    );

    if (recetaExiste) {
      return res.status(400).json({ message: 'El ingrediente ya existe en la receta' });
    }

    // Insertar ingrediente si no está repetido
    const result = await db.collection('users').updateOne(
      { 'recetas.slug': recetaSlug },
      { $push: { 'recetas.$.ingredientes': { nombre, slug: ingredienteSlug } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.json({ message: 'Ingrediente agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar ingrediente de una receta por slug
export const deleteIngrediente = async (req, res) => {
  const { recetaSlug, ingredienteSlug } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db.collection('users').updateOne(
      { 'recetas.slug': recetaSlug },
      { $pull: { 'recetas.$.ingredientes': { slug: ingredienteSlug } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Receta o ingrediente no encontrado' });
    }

    res.json({ message: 'Ingrediente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar recetas que contengan un ingrediente por slug
export const getRecetasByIngrediente = async (req, res) => {
  const { ingredienteSlug } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);

    const usuarios = await db.collection('users').find({
      'recetas.ingredientes.slug': ingredienteSlug
    }).toArray();

    const recetasEncontradas = usuarios.flatMap(user =>
      user.recetas.filter(receta =>
        receta.ingredientes.some(ing => ing.slug === ingredienteSlug)
      )
    );

    if (!recetasEncontradas.length) {
      return res.status(404).json({ message: 'No se encontraron recetas con ese ingrediente' });
    }

    res.json(recetasEncontradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};