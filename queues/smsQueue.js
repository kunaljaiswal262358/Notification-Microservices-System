const Queue = require("bull");

const smsQueue = new Queue("smsQueue", process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 }, 
  },
});

module.exports = smsQueue;