import { getDB } from "./db/database.js";

export class Logger {
    #db
    #coll;
    constructor()  {
        this.#db = getDB();
        this.#coll = this.#db.collection("email-logs");
    }

    async logInDB(log) {
        return await this.#coll.insertOne(log);
    }

    async getLogs(filter = {}) {
        return await this.#coll.find(filter).toArray();
    }
}