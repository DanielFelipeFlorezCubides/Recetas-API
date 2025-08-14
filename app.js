import express from 'express';
import ingredientesRouter from './routers/ingredientesRouter.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use('/ingredientes', ingredientesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});