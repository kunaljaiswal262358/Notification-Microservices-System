require("dotenv").config();
require("./config/db")();
const Log = require("./models/Log");
const { emailQueue } = require("./queues");
const sendEmail = require("./services/emailService");

emailQueue.process(async (job) => {
  const { to, subject, data } = job.data;

  await sendEmail({ to: to, subject: subject, html: data });
});

emailQueue.on("completed", async (job) => {
  console.log("Email sent!");
  try {
    const log = new Log({
      type: "email",
      to: job.data.to,
      status: "success",
    });

    await log.save();
  } catch (err) {
    console.log(err);
    return err;
  }
});

emailQueue.on("failed", async (job, result) => {
  if (job.attemptsMade < job.opts.attempts) return;
  console.log("Email Failed to Send: ", result);
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
