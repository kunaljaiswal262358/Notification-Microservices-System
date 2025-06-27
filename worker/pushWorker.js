require('dotenv').config()
require("../config/db")();
const Log = require("../models/Log");
const pushQueue = require('../queues/pushQueue');
const sendPush = require('../services/pushService');

pushQueue.process(async (job) => {
    await sendPush(job.data);
})


pushQueue.on("completed", async (job) => {
  try {
    const log = new Log({
      type: "push",
      to: job.data.to,
      status: "success",
    });

    await log.save();
  } catch (err) {
    console.log(err);
  }
});

pushQueue.on("failed", async (job) => {
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
