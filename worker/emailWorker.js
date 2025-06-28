require("dotenv").config();
require("../config/db")();
const Log = require("../models/Log");
const {emailQueue} = require("../queues");
const sendEmail = require("../services/emailService");


emailQueue.process(async (job) => {
  const { to, subject, data } = job.data;

  try {
    await sendEmail({ to: to, subject: subject, html: data });
  } catch (err) {
    console.log(err);
  }
});

emailQueue.on("completed", async (job) => {
  try {
    const log = new Log({
      type: "email",
      to: job.data.to,
      status: "success",
    });

    await log.save();
  } catch (err) {
    console.log(err);
  }
});

emailQueue.on("failed", async (job) => {
  if (job.attemptsMade < job.opts.attempts) return;
  console.log("Email Failed to Send")
  try {
    const log = new Log({
      type: "email",
      to: job.data.to,
      status: "failed",
    });

    await log.save();
  } catch (err) {
    console.log(err);
  }
});
