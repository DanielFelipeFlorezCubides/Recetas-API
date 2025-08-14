# 🍳 Plataforma de Recetas Culinarias – Módulo de Ingredientes

Este módulo forma parte de la **API REST** para una plataforma de recetas culinarias desarrollada con **Node.js**, **Express** y **MongoDB** usando la librería oficial `mongodb`.  
Permite agregar, listar, buscar y eliminar ingredientes de las recetas, utilizando **slugs** en lugar de IDs para facilitar el uso de la API.

---

## 📦 Tecnologías usadas
- Node.js
- Express
- MongoDB (driver oficial)
- Dotenv

---
## 1. Instalar dependencias:
```
npm install
```

## 2. Configurar el archivo .env:
```
PORT=5500
DB_URI=mongodb://localhost:27017/
DB_NAME=comidas
```

## 3. Poblar la base de datos con datos de ejemplo:
```
npm run seed
```

## 4. Iniciar el servidor:
```
npm start
```

## 📑 Endpoints del módulo de ingredientes

> Todos los endpoints usan **slugs** para identificar recetas e ingredientes.

------

### 1️⃣ Agregar ingrediente a una receta

**POST** `/ingredientes/receta/:recetaSlug`

- **Descripción:** Agrega un nuevo ingrediente a una receta existente.

- **Parámetros de ruta:**

  - `recetaSlug` → slug de la receta (ej. `pollo-al-horno`)

- **Body (JSON):**

  ```
  {
    "nombre": "Sal marina"
  }
  ```

- **Ejemplo de request:**

  ```
  POST /ingredientes/receta/pollo-al-horno
  
  {
    "nombre": "Sal marina"
  }
  ```

- **Ejemplo de response:**

  ```
  {
    "mensaje": "Ingrediente agregado correctamente",
    "ingrediente": {
      "nombre": "Sal marina",
      "slug": "sal-marina"
    }
  }
  ```

------

### 2️⃣ Ver ingredientes de una receta

**GET** `/ingredientes/receta/:recetaSlug`

- **Descripción:** Obtiene todos los ingredientes de una receta.

- **Parámetros de ruta:**

  - `recetaSlug` → slug de la receta.

- **Ejemplo de request:**

  ```
  GET /ingredientes/receta/pollo-al-horno
  ```

- **Ejemplo de response:**

  ```
  [
    { "nombre": "Pollo", "slug": "pollo" },
    { "nombre": "Sal marina", "slug": "sal-marina" }
  ]
  ```

------

### 3️⃣ Eliminar un ingrediente de una receta

**DELETE** `/ingredientes/receta/:recetaSlug/ingrediente/:ingredienteSlug`

- **Descripción:** Elimina un ingrediente específico de una receta.

- **Parámetros de ruta:**

  - `recetaSlug` → slug de la receta.
  - `ingredienteSlug` → slug del ingrediente a eliminar.

- **Ejemplo de request:**

  ```
  DELETE /ingredientes/receta/pollo-al-horno/ingrediente/sal-marina
  ```

- **Ejemplo de response:**

  ```
  { "mensaje": "Ingrediente eliminado correctamente" }
  ```

------

### 4️⃣ Buscar recetas por ingrediente

**GET** `/ingredientes/buscar/:ingredienteSlug`

- **Descripción:** Obtiene todas las recetas que contengan un ingrediente específico.

- **Parámetros de ruta:**

  - `ingredienteSlug` → slug del ingrediente a buscar.

- **Ejemplo de request:**

  ```
  GET /ingredientes/buscar/sal-marina
  ```

- **Ejemplo de response:**

  ```
  [
    {
      "titulo": "Pollo al horno",
      "slug": "pollo-al-horno",
      "ingredientes": [
        { "nombre": "Pollo", "slug": "pollo" },
        { "nombre": "Sal marina", "slug": "sal-marina" }
      ]
    }
  ]
  ```

------

## 🚨 Manejo de errores

El módulo devuelve mensajes claros en caso de error:

- **404** → Receta o ingrediente no encontrado.
- **400** → Datos inválidos o faltantes.
- **500** → Error interno del servidor.

Ejemplo:

```
{ "error": "El campo 'nombre' es obligatorio" }
```

------

## 👨‍💻 Autor

Módulo desarrollado por Daniel Florez Cubides.