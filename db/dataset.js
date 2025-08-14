import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // elimina acentos
    .replace(/\s+/g, '-') // espacios → guiones
    .replace(/[^\w\-]+/g, '') // quita caracteres no válidos
    .replace(/\-\-+/g, '-') // evita guiones dobles
    .trim();
}

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    await usersCollection.deleteMany({});

    await usersCollection.insertMany([
      {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        recetas: [
          {
            titulo: 'Pollo al horno',
            slug: slugify('Pollo al horno'),
            descripcion: 'Pollo horneado con hierbas y papas.',
            ingredientes: [
              { nombre: 'Pollo', slug: slugify('Pollo') },
              { nombre: 'Papas', slug: slugify('Papas') },
              { nombre: 'Romero', slug: slugify('Romero') }
            ]
          },
          {
            titulo: 'Ensalada fresca',
            slug: slugify('Ensalada fresca'),
            descripcion: 'Ensalada con vegetales frescos y aderezo de limón.',
            ingredientes: [
              { nombre: 'Lechuga', slug: slugify('Lechuga') },
              { nombre: 'Tomate', slug: slugify('Tomate') },
              { nombre: 'Limón', slug: slugify('Limón') }
            ]
          }
        ]
      },
      {
        nombre: 'María López',
        email: 'maria@example.com',
        recetas: [
          {
            titulo: 'Tacos de carne',
            slug: slugify('Tacos de carne'),
            descripcion: 'Tacos rellenos con carne sazonada y vegetales.',
            ingredientes: [
              { nombre: 'Carne de res', slug: slugify('Carne de res') },
              { nombre: 'Tortillas', slug: slugify('Tortillas') },
              { nombre: 'Cebolla', slug: slugify('Cebolla') }
            ]
          }
        ]
      }
    ]);

    console.log('✅ Datos insertados con slug en recetas e ingredientes');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();