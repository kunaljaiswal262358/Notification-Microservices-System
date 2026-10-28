import { MongoClient } from "mongodb";
let client;

export const connectDB = async () => {
    if(client) return;
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Mongodb is connected.")
}

export const close = async () => {
    await client.close();
}

export const getDB = () => {
    return client.db();
}