import { connect, getDB } from "./config.js";

async function seed() {
  const recetas = [
        {
          id: 1,
          clientID: 2,
          titulo: "Espaguetis Con Pollo",
          descripcion: "Espaguetis con salsa de tomate y pollo desmechado",
          ingredientes: [
            {
                id: 1,
                nombre: "pollo"
            },
            {
                id: 2,
                nombre: "espaguetis"
            },
            {
                id:3,
                nombre: "salsa de tomate"
            },
          ]
        },
        
  {
    "id": 2,
    "clientID": 3,
    "titulo": "Ensalada César",
    "descripcion": "Lechuga fresca con pollo a la parrilla, crutones y aderezo César",
    "ingredientes": [
      { "id": 1, "nombre": "lechuga" },
      { "id": 2, "nombre": "pollo a la parrilla" },
      { "id": 3, "nombre": "aderezo César" },
      { "id": 4, "nombre": "crutones" }
    ]
  },
  {
    "id": 3,
    "clientID": 4,
    "titulo": "Pizza Margarita",
    "descripcion": "Pizza con salsa de tomate, mozzarella y albahaca fresca",
    "ingredientes": [
      { "id": 1, "nombre": "masa de pizza" },
      { "id": 2, "nombre": "salsa de tomate" },
      { "id": 3, "nombre": "mozzarella" },
      { "id": 4, "nombre": "albahaca" }
    ]
  },
  {
    "id": 4,
    "clientID": 5,
    "titulo": "Sopa de Lentejas",
    "descripcion": "Lentejas cocidas con verduras y especias",
    "ingredientes": [
      { "id": 1, "nombre": "lentejas" },
      { "id": 2, "nombre": "zanahoria" },
      { "id": 3, "nombre": "cebolla" },
      { "id": 4, "nombre": "comino" }
    ]
  },
  {
    "id": 5,
    "clientID": 6,
    "titulo": "Arroz con Coco",
    "descripcion": "Arroz blanco cocinado con leche de coco y azúcar morena",
    "ingredientes": [
      { "id": 1, "nombre": "arroz" },
      { "id": 2, "nombre": "leche de coco" },
      { "id": 3, "nombre": "azúcar morena" },
      { "id": 4, "nombre": "sal" }
    ]
  },
  {
    "id": 6,
    "clientID": 7,
    "titulo": "Tacos de Carne Asada",
    "descripcion": "Tortillas de maíz rellenas con carne asada y guacamole",
    "ingredientes": [
      { "id": 1, "nombre": "tortillas de maíz" },
      { "id": 2, "nombre": "carne asada" },
      { "id": 3, "nombre": "guacamole" },
      { "id": 4, "nombre": "cilantro" }
    ]
  },
  {
    "id": 7,
    "clientID": 8,
    "titulo": "Arepas Rellenas",
    "descripcion": "Arepas de maíz rellenas con queso y jamón",
    "ingredientes": [
      { "id": 1, "nombre": "harina de maíz" },
      { "id": 2, "nombre": "queso" },
      { "id": 3, "nombre": "jamón" },
      { "id": 4, "nombre": "mantequilla" }
    ]
  },
  {
    "id": 8,
    "clientID": 9,
    "titulo": "Hamburguesa Clásica",
    "descripcion": "Pan de hamburguesa con carne, lechuga, tomate y queso cheddar",
    "ingredientes": [
      { "id": 1, "nombre": "pan de hamburguesa" },
      { "id": 2, "nombre": "carne molida" },
      { "id": 3, "nombre": "lechuga" },
      { "id": 4, "nombre": "tomate" },
      { "id": 5, "nombre": "queso cheddar" }
    ]
  },
  {
    "id": 9,
    "clientID": 10,
    "titulo": "Paella de Mariscos",
    "descripcion": "Arroz con camarones, calamares y mejillones",
    "ingredientes": [
      { "id": 1, "nombre": "arroz" },
      { "id": 2, "nombre": "camarones" },
      { "id": 3, "nombre": "calamares" },
      { "id": 4, "nombre": "mejillones" },
      { "id": 5, "nombre": "pimiento rojo" }
    ]
  },
  {
    "id": 10,
    "clientID": 11,
    "titulo": "Lasagna Boloñesa",
    "descripcion": "Capas de pasta con salsa boloñesa y queso gratinado",
    "ingredientes": [
      { "id": 1, "nombre": "pasta para lasagna" },
      { "id": 2, "nombre": "salsa boloñesa" },
      { "id": 3, "nombre": "queso mozzarella" },
      { "id": 4, "nombre": "parmesano" }
    ]
  },
  {
    "id": 11,
    "clientID": 12,
    "titulo": "Ceviche Peruano",
    "descripcion": "Pescado blanco marinado en limón con cebolla morada y cilantro",
    "ingredientes": [
      { "id": 1, "nombre": "pescado blanco" },
      { "id": 2, "nombre": "limón" },
      { "id": 3, "nombre": "cebolla morada" },
      { "id": 4, "nombre": "cilantro" },
      { "id": 5, "nombre": "ají limo" }
    ]
  }



  ];

  await connect();
  await getDB().collection("recetas").deleteMany();
  await getDB().collection("recetas").insertMany(recetas);

  console.log("🆗 Dataset!!")
  process.exit();
}

seed();
import { connect, getDB } from "./config.js";
