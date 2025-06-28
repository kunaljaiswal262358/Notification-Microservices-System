require("dotenv").config();
require("./config/db")();

const Log = require("./models/Log");
const { smsQueue } = require("./queues");
const sendSms = require("./services/smsService");

smsQueue.process(async (job) => {
  await sendSms(job.data);
});

smsQueue.on("completed", async (job) => {
  try {
    const log = new Log({
      type: "sms",
      to: job.data.to,
      status: "success",
    });

    await log.save();
  } catch (err) {
    console.log(err);
  }
});

smsQueue.on("failed", async (job) => {
  if (job.attemptsMade < job.opts.attempts) return;

  try {
    const log = new Log({
      type: "sms",
      to: job.data.to,
      status: "failed",
    });

    await log.save();
  } catch (err) {
    console.log(err);
  }
});
