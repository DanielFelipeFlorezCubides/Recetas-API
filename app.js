import dotenv from "dotenv";
import express from "express";
import recetaRouter from "./routers/recetaRouter.js"
import usuariosRouter from "./routers/comidaRouter.js";
import { connect } from "./db/config.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5500;

app.use(express.json());

app.use("/receta", recetaRouter);

app.get("/home", function (req, res) {
  res.send("API DE RECETAS FUNCIONANDO CORRECTAMENTE, intercambia el /home por /receta")
});

connect().then(() => {
  app.listen(port, () => {
    console.log("http://localhost:" + port + "/home");

  });
});


app.use("/usuarios", usuariosRouter);

connect().then(() => {
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Could not start server:", err);
});
