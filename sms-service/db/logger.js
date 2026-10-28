import { getDB } from "./client.js";

export default class Logger {
  #collection = "sms-logs";
  constructor() {
    this.#collection = getDB().collection(this.#collection);
  }

  async save(data) {
    const result = await this.#collection.insertOne({
      ...data,
      createdAt: Date.now(),
    });
    return result;
  }

  async getTodaySucceedLogs() {
    const todayLogs = await this.#collection.find({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
      Error: { $exists: false }
    });
    const list = await todayLogs.toArray();
    return list;
  }
}
