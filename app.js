import dotenv from "dotenv";
import express from "express";
import recetaRouter from "./routers/recetaRouter.js"
import usuariosRouter from "./routers/comidaRouter.js";
import ingredientesRouter from "./routers/ingredientesRouter.js";
import { connect } from "./db/config.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5500;

// Middleware para parsear JSON
app.use(express.json());

connect().then(() => {
  console.log("✅ Base de datos conectada");

  // Montar las rutas
  app.use("/usuarios", usuariosRouter);
  app.use("/receta", recetaRouter);
  app.use("/recetas", ingredientesRouter);

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Error al conectar a la base de datos:", err);
});
