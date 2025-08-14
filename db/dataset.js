import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Limpiar datos previos
    await usersCollection.deleteMany({});

    // Insertar datos de prueba
    await usersCollection.insertMany([
      {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        recetas: [
          {
            titulo: 'Pollo al horno',
            descripcion: 'Pollo horneado con hierbas y papas.',
            ingredientes: [
              { nombre: 'Pollo' },
              { nombre: 'Papas' },
              { nombre: 'Romero' }
            ]
          },
          {
            titulo: 'Ensalada fresca',
            descripcion: 'Ensalada con vegetales frescos y aderezo de limón.',
            ingredientes: [
              { nombre: 'Lechuga' },
              { nombre: 'Tomate' },
              { nombre: 'Limón' }
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
            descripcion: 'Tacos rellenos con carne sazonada y vegetales.',
            ingredientes: [
              { nombre: 'Carne de res' },
              { nombre: 'Tortillas' },
              { nombre: 'Cebolla' }
            ]
          }
        ]
      }
    ]);

    console.log('✅ Datos insertados correctamente');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();