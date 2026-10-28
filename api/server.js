import express from "express";
import dotenv from "dotenv";
import Queue from "bull";
import { connectDB, getDB } from "./db/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
await connectDB();

app.use(express.json());

app.post("/notify/email", async (req, res) => {
  try {
    const emailQueue = new Queue("email-queue");
    const { to, subject, body } = req.body;
    await emailQueue.add({ to, subject, body });
    res
      .status(200)
      .send({ message: "Your request queued. It will be sent shortly" });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).send({ error: error.message });
  }
});

app.post("/notify/sms", async (req, res) => {
  try {
    const smsQueue = new Queue("sms-queue");
    await smsQueue.add();
    res
      .status(200)
      .send({ message: "your request queued. It will be sent shortly." });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).send({ error: error.message });
  }
});

const db = getDB();
const smsLogs = db.collection("sms-logs");
const emailLogs = db.collection("email-logs");
function toLocalDateString(data) {
  const res = [];
  data.forEach((item) => {
    if (item.createdAt)
      res.push({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString("en-IN", {
          weekDay: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    else res.push(item);
  });
  return res;
}
app.get("/logs/sms", async (req, res) => {
  try {
    const allLogs = await smsLogs.find({}).toArray();
    res.status(200).send({ logs: toLocalDateString(allLogs) });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send({ error: err.message });
  }
});

app.get("/logs/sms/today", async (req, res) => {
  try {
    const todayLogs = await smsLogs
      .find({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } })
      .toArray();
    res.status(200).send({ logs: toLocalDateString(todayLogs) });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send({ error: err.message });
  }
});

app.get("/logs/email", async (req, res) => {
  try {
    const allLogs = await emailLogs.find({}).toArray();
    res.status(200).send({ logs: toLocalDateString(allLogs) });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send({ error: err.message });
  }
});

app.get("/logs/email/today", async (req, res) => {
  try {
    const todayLogs = await emailLogs
      .find({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } })
      .toArray();
    res.status(200).send({ logs: toLocalDateString(todayLogs) });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
