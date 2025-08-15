# 📌 Documentación - Rama `feature/usuarios`

Esta rama implementa la **gestión de usuarios** para la API REST del proyecto **Comidas**.  
Incluye endpoints para crear, consultar, actualizar y eliminar usuarios, además de la eliminación automática de todas sus recetas asociadas.

---

## 🚀 Características implementadas en esta rama
- **Registrar nuevos usuarios** en la plataforma.
- **Consultar la lista de todos los usuarios registrados**.
- **Ver la información detallada de un usuario** por su ID.
- **Actualizar datos de un usuario** existente.
- **Eliminar un usuario** junto con todas sus recetas asociadas.

---

## ⚙️ Configuración del entorno

### 1️⃣ Variables de entorno
En el archivo `.env` deben estar configuradas las siguientes variables:
```env
PORT=5500
DB_URI=mongodb://localhost:27017/
DB_NAME=comidas
```

### 2️⃣ Conexión a MongoDB
La conexión se maneja en `db/config.js` usando el driver oficial de MongoDB y `dotenv`.

---

## 📂 Archivos creados/modificados en esta rama

```
📦 proyecto
 ┣ 📂 db
 ┃ ┗ 📜 config.js   # Conexión a MongoDB
 ┣ 📂 routes
 ┃ ┗ 📜 usuarios.routes.js   # Endpoints CRUD de usuarios
 ┣ 📜 app.js        # Montaje del router y servidor Express
 ┗ 📜 .env          # Variables de entorno
```

---

## 🔌 Endpoints implementados

### **1️⃣ Obtener todos los usuarios**
```
GET /usuarios/getall
```
📄 Respuesta:
```json
[
  { "id": 1, "nombre": "Mateo", "telefono": "3001234567", "correo": "mateo@example.com" }
]
```

---

### **2️⃣ Obtener usuario por ID**
```
GET /usuarios/get/:id
```
📄 Respuesta:
```json
{ "id": 1, "nombre": "Mateo", "telefono": "3001234567", "correo": "mateo@example.com" }
```

---

### **3️⃣ Crear un nuevo usuario**
```
POST /usuarios/create
```
📄 Body:
```json
{
  "id": 1,
  "nombre": "Mateo",
  "telefono": "3001234567",
  "correo": "mateo@example.com"
}
```

---

### **4️⃣ Actualizar un usuario**
```
PUT /usuarios/update/:id
```
📄 Body:
```json
{
  "telefono": "3019998888"
}
```

---

### **5️⃣ Eliminar un usuario y sus recetas**
```
DELETE /usuarios/delete/:id
```
📄 Respuesta:
```json
{ "message": "User and recipes deleted successfully!" }
```

---

## 🧪 Pruebas con Insomnia
Para probar estos endpoints:
1. Levantar el servidor:
```bash
node app.js
```
2. En Insomnia, crear las peticiones usando la URL base:
```
http://localhost:5500
```

---

## 📜 Notas
- La eliminación de usuario también borra todas las recetas con el mismo `idUsuario`.
- Se usa un campo `id` numérico para identificar a cada usuario.
- El router está montado en la ruta `/usuarios`.

---

✏️ **Autor:** Desarrollo en la rama `feature/usuarios` Por Mateo Paternina Mercado


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


