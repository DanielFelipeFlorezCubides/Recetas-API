# Gestión de Ingredientes

Este módulo forma parte de un sistema de gestión de recetas, y permite **listar, agregar, eliminar y buscar ingredientes**de una receta almacenada en MongoDB.

------

## 📋 Requisitos previos

- **Node.js** instalado (con soporte ESM: `"type": "module"` en `package.json`).

- **MongoDB** corriendo localmente o en la nube (Atlas).

- Dependencias instaladas:

  - `express`
  - `mongodb`
  - `dotenv`

- Archivo `.env` con:

  ```
  PORT=5500
  DB_URI=mongodb://localhost:27017
  DB_NAME=recetasdb
  ```

------

## 📂 Estructura de carpetas

```
📦 Recetas-API
 ┣ 📂 routes
 ┃ ┗ ingredientesRouter.js
 ┣ 📂 controllers
 ┃ ┗ ingredientesController.js
 ┣ 📂 db
 ┃ ┣ config.js
 ┃ ┗ dataset.js
 ┣ app.js
 ┣ package.json
 ┗ .env
```

------

## 🗃 Poblar datos de prueba

El archivo `dataset.js` contiene recetas con ingredientes iniciales.
Para cargar estos datos en MongoDB:

```
npm run seed
```

Esto eliminará los datos anteriores y cargará el dataset de ejemplo.

------

## 🚀 Iniciar el servidor

```
npm start
```

Si todo funciona, deberías ver:

```
🆗 MongoDB connected!!
Servidor escuchando en puerto 5500
```

------

## 📌 Endpoints disponibles

### 1️⃣ Listar ingredientes de una receta

- **Método:** `GET`
- **URL:** `/recetas/{idReceta}/ingredientes`
- **Descripción:** Devuelve todos los ingredientes de una receta específica.
- **Ejemplo:**
  `/recetas/1/ingredientes`

------

### 2️⃣ Agregar ingrediente a una receta

- **Método:** `POST`

- **URL:** `/recetas/{idReceta}/ingredientes`

- **Body (JSON):**

  ```
  {
    "id": 5,
    "nombre": "aceite de oliva"
  }
  ```

- **Descripción:** Agrega un ingrediente nuevo a la receta indicada.

------

### 3️⃣ Eliminar ingrediente de una receta

- **Método:** `DELETE`
- **URL:** `/recetas/{idReceta}/ingredientes/{idIngrediente}`
- **Descripción:** Elimina un ingrediente específico de la receta.
- **Ejemplo:**
  `/recetas/1/ingredientes/3`

------

### 4️⃣ Buscar recetas por nombre de ingrediente

- **Método:** `GET`
- **URL:** `/recetas/buscar/{nombreIngrediente}`
- **Descripción:** Devuelve todas las recetas que contengan el ingrediente buscado (búsqueda parcial y sin distinción de mayúsculas).
- **Ejemplo:**
  `/recetas/buscar/pollo`

------

## 🧪 Pruebas con Insomnia o Postman

1. **Listar ingredientes**
   - Método: `GET`
   - URL: `http://localhost:5500/recetas/1/ingredientes`
2. **Agregar ingrediente**
   - Método: `POST`
   - URL: `http://localhost:5500/recetas/1/ingredientes`
   - Body: JSON con `id` y `nombre`.
3. **Eliminar ingrediente**
   - Método: `DELETE`
   - URL: `http://localhost:5500/recetas/1/ingredientes/2`
4. **Buscar recetas por ingrediente**
   - Método: `GET`
   - URL: `http://localhost:5500/recetas/buscar/pollo`

------

## ⚠ Errores comunes

- **404 - Ruta no encontrada:** Revisar que la URL comience con `/recetas/` y que el router esté correctamente montado.
- **400 - Body inválido:** Verificar `Content-Type: application/json` y formato correcto en POST.
- **Conexión fallida a MongoDB:** Comprobar que la base de datos esté activa y que las variables `.env` sean correctas.

------

## 📜 Licencia

Este proyecto es de uso libre para fines educativos.