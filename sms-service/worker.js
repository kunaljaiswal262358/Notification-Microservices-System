import { loadEnvFile } from "node:process";
import Logger from "./db/logger.js";
import { connectDB } from "./db/client.js";
import { createMessage, createTwilioClient } from "./twilio.js";
import { createQueue } from "./smsQueue.js";

loadEnvFile("./.env");

await connectDB();
await createTwilioClient();
const smsQueue = await createQueue();
smsQueue.process(processMethod);

async function processMethod() {
  console.log("Process method is called.");
  let logger;
  try {
    logger = new Logger();
    if(!(await canSend())) throw new Error(`Max limit (${process.env.MAX_SMS_LIMIT}) reached`);

    const res = await createMessage();
    const newMessage = {
      sid: res.sid,
      message: res.body,
      to: process.env.TWILIO_PHONE_NUMBER || "unknown",
    };
    console.log(newMessage);
    await logger.save(newMessage);
  } catch (error) {
    console.log("Error: " + error.message);
    await logger.save({ Error: error.message });
  }
}

async function canSend() {
  const maxLimit = process.env.MAX_SMS_LIMIT;
  const todayLogs = await (new Logger()).getTodaySucceedLogs();
  const count = todayLogs.length;
  if(count < maxLimit) {
    return true
  }
  return false;
}