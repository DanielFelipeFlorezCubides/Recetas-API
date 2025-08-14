import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/config.js";
import usuariosRouter from "./routes/usuarios.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/usuarios", usuariosRouter);

connect().then(() => {
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Could not start server:", err);
});
