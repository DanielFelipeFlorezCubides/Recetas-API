import { connect, getDB } from "./config.js";

async function seed() {
  const recetas = [
  {
    "id": 1,
    "usuario": [
      { "id": 1, "nombre": "JuanPerez", "telefono": 3001234567, "correo": "juanperez@mail.com" }
    ],
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
    "id": 2,
    "usuario": [
      { "id": 2, "nombre": "MariaLopez", "telefono": 3207654321, "correo": "maria@mail.com" }
    ],
    "titulo": "Espaguetis con Pollo",
    "descripcion": "Pasta espagueti con salsa cremosa y pollo",
    "ingredientes": [
      { "id": 6, "nombre": "espaguetis" },
      { "id": 5, "nombre": "pechuga de pollo" },
      { "id": 7, "nombre": "aceite de oliva" },
      { "id": 4, "nombre": "parmesano" }
    ]
  },
  {
    "id": 3,
    "usuario": [
      { "id": 3, "nombre": "SirPinto", "telefono": 3109876543, "correo": "sirpinto@mail.com" }
    ],
    "titulo": "Arroz con Pollo",
    "descripcion": "Arroz amarillo con pollo y verduras",
    "ingredientes": [
      { "id": 19, "nombre": "arroz" },
      { "id": 24, "nombre": "pollo desmechado" },
      { "id": 21, "nombre": "zanahoria" },
      { "id": 22, "nombre": "pimentón rojo" }
    ]
  },
  {
    "id": 4,
    "usuario": [
      { "id": 4, "nombre": "LauraMendez", "telefono": 3124567890, "correo": "lauram@mail.com" }
    ],
    "titulo": "Ensalada César",
    "descripcion": "Ensalada fresca con lechuga, pollo, parmesano y aderezo César",
    "ingredientes": [
      { "id": 33, "nombre": "lechuga" },
      { "id": 24, "nombre": "pollo desmechado" },
      { "id": 4, "nombre": "parmesano" },
      { "id": 35, "nombre": "mayonesa" }
    ]
  },
  {
    "id": 5,
    "usuario": [
      { "id": 5, "nombre": "CarlosRuiz", "telefono": 3112223333, "correo": "carlos@mail.com" }
    ],
    "titulo": "Hamburguesa Clásica",
    "descripcion": "Hamburguesa con carne, queso cheddar y vegetales",
    "ingredientes": [
      { "id": 37, "nombre": "pan para hamburguesa" },
      { "id": 38, "nombre": "carne molida" },
      { "id": 18, "nombre": "queso cheddar" },
      { "id": 34, "nombre": "tomate en rodajas" }
    ]
  },
  {
    "id": 6,
    "usuario": [
      { "id": 6, "nombre": "AnaTorres", "telefono": 3105551111, "correo": "ana@mail.com" }
    ],
    "titulo": "Pizza Pepperoni",
    "descripcion": "Pizza con salsa de tomate, mozzarella y pepperoni",
    "ingredientes": [
      { "id": 41, "nombre": "masa para pizza" },
      { "id": 42, "nombre": "salsa de tomate" },
      { "id": 3, "nombre": "queso mozzarella" },
      { "id": 40, "nombre": "pepperoni" }
    ]
  },
  {
    "id": 7,
    "usuario": [
      { "id": 7, "nombre": "LuisMartinez", "telefono": 3007778888, "correo": "luis@mail.com" }
    ],
    "titulo": "Ensalada de Aguacate",
    "descripcion": "Ensalada fresca con aguacate, tomate y pepino",
    "ingredientes": [
      { "id": 29, "nombre": "aguacate" },
      { "id": 34, "nombre": "tomate en rodajas" },
      { "id": 32, "nombre": "pepino" },
      { "id": 31, "nombre": "cilantro" }
    ]
  },
  {
    "id": 8,
    "usuario": [
      { "id": 8, "nombre": "PedroGomez", "telefono": 3019994444, "correo": "pedro@mail.com" }
    ],
    "titulo": "Lentejas Guisadas",
    "descripcion": "Lentejas cocidas con verduras y especias",
    "ingredientes": [
      { "id": 27, "nombre": "lentejas" },
      { "id": 10, "nombre": "cebolla" },
      { "id": 9, "nombre": "ajo" },
      { "id": 11, "nombre": "sal" }
    ]
  },
  {
    "id": 9,
    "usuario": [
      { "id": 9, "nombre": "SofiaReyes", "telefono": 3103334444, "correo": "sofia@mail.com" }
    ],
    "titulo": "Curry de Pollo",
    "descripcion": "Pollo en salsa de curry con arroz",
    "ingredientes": [
      { "id": 5, "nombre": "pechuga de pollo" },
      { "id": 26, "nombre": "curry en polvo" },
      { "id": 19, "nombre": "arroz" },
      { "id": 25, "nombre": "caldo de pollo" }
    ]
  },
  {
    "id": 10,
    "usuario": [
      { "id": 10, "nombre": "DavidMorales", "telefono": 3204445555, "correo": "david@mail.com" }
    ],
    "titulo": "Tortilla de Papas",
    "descripcion": "Tortilla española con papa y huevo",
    "ingredientes": [
      { "id": 20, "nombre": "papa" },
      { "id": 14, "nombre": "huevo" },
      { "id": 11, "nombre": "sal" },
      { "id": 7, "nombre": "aceite de oliva" }
    ]
  },
  {
    "id": 11,
    "usuario": [
      { "id": 11, "nombre": "CamilaRios", "telefono": 3009991111, "correo": "camila@mail.com" }
    ],
    "titulo": "Pasta Alfredo",
    "descripcion": "Pasta con salsa Alfredo cremosa",
    "ingredientes": [
      { "id": 6, "nombre": "espaguetis" },
      { "id": 16, "nombre": "mantequilla" },
      { "id": 17, "nombre": "leche" },
      { "id": 4, "nombre": "parmesano" }
    ]
  },
  {
    "id": 12,
    "usuario": [
      { "id": 12, "nombre": "EstebanVega", "telefono": 3121231234, "correo": "esteban@mail.com" }
    ],
    "titulo": "Garbanzos al Curry",
    "descripcion": "Garbanzos cocidos en salsa curry con arroz",
    "ingredientes": [
      { "id": 28, "nombre": "garbanzos" },
      { "id": 26, "nombre": "curry en polvo" },
      { "id": 19, "nombre": "arroz" },
      { "id": 25, "nombre": "caldo de pollo" }
    ]
  },
  {
    "id": 13,
    "usuario": [
      { "id": 13, "nombre": "GabrielaSantos", "telefono": 3133211234, "correo": "gabriela@mail.com" }
    ],
    "titulo": "Batido de Fresas",
    "descripcion": "Bebida fría con fresas y yogur",
    "ingredientes": [
      { "id": 47, "nombre": "fresas" },
      { "id": 45, "nombre": "yogur natural" },
      { "id": 46, "nombre": "miel" }
    ]
  },
    {
    "id": 15,
    "usuario": [
      { "id": 13, "nombre": "GabrielaSantos", "telefono": 3133211234, "correo": "gabriela@mail.com" }
    ],
    "titulo": "Batido de Fresas",
    "descripcion": "Bebida fría con fresas y yogur",
    "ingredientes": [
      { "id": 47, "nombre": "fresas" },
      { "id": 45, "nombre": "yogur natural" },
      { "id": 46, "nombre": "miel" }
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