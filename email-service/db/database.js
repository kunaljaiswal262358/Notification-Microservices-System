import { MongoClient } from "mongodb";

let db;
let client;
export async function connectDB() {
  if (client) return;
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log("Mongodb connected succesfully.");
}

export function getDB() {
  return db;
}

export async function closeDB() {
    if(client) {
        await client.close();
        client = null;
        db = null;
        console.log("Mongodb is closed");
    }
}