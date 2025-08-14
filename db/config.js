import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);
let db;

export async function connect() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log(`🆗 MongoDB connected to database: ${dbName}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
}

export function getDB() {
  if (!db) {
    throw new Error("❌ Database connection not initialized!");
  }
  return db;
}
