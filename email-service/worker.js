import { loadEnvFile } from "node:process";
import { connectDB } from "./db/database.js";
import { createQueue } from "./emailQueue.js";
import { createEmailTransport, sendEmail } from "./emailService.js";
import { Logger } from "./Logger.js";
loadEnvFile("./.env");

// console.log(process.env.MONGO_URI);
// console.log(process.env.REDIS_URI);

await connectDB();
await createEmailTransport();
const emailQueue = await createQueue();
emailQueue.process(worker);
console.log("Email Worker started.")

async function worker(job) {
    const {to, subject, body} = job.data;
  let logger;
  try {
    logger = new Logger();
    const sid = await sendEmail({to, subject, body});
    await logger.logInDB({sid, subject, body, createdAt: Date.now()});
  } catch (error) {
    console.log("Error: " + error.message);
    await logger.logInDB({ Error: error.message });
  }
}
