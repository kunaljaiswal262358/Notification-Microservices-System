import { MongoClient } from "mongodb";

let client;
let db;

export async function connectDB() {
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log("Database connected.");
}

export function getDB() {
  return db;
}

export async function close() {
  if (client) {
    await client.close();
    console.log("Database closed.");
  } else {
    console.log("Client not found.");
  }
}
