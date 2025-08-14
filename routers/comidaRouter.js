import { Router } from "express";
import { getDB } from "../db/config.js";

const router = Router();

router.get("/getall", async (req, res) => {
  try {
    const usuarios = await getDB().collection("usuarios").find().toArray();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id);
    const usuario = await getDB()
      .collection("usuarios")
      .findOne({ id: idUsuario });

    if (!usuario) {
      return res.status(404).json({ error: "User doesn't exist!" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { id, nombre, telefono, correo } = req.body;

    if (!id || !nombre || !telefono || !correo) {
      return res.status(400).json({ error: "Invalid input!" });
    }

    const usuario = { id, nombre, telefono, correo };
    await getDB().collection("usuarios").insertOne(usuario);

    res.status(201).json({ message: "User created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id);
    const { nombre, telefono, correo } = req.body;

    if (!nombre && !telefono && !correo) {
      return res.status(400).json({ error: "No data to update!" });
    }

    const result = await getDB().collection("usuarios").updateOne(
      { id: idUsuario },
      { $set: { ...(nombre && { nombre }), ...(telefono && { telefono }), ...(correo && { correo }) } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.id);

    // Primero eliminamos las recetas asociadas
    await getDB().collection("recetas").deleteMany({ idUsuario });

    // Luego eliminamos el usuario
    const result = await getDB().collection("usuarios").deleteOne({ id: idUsuario });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "User and recipes deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
