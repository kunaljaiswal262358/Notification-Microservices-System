const Queue = require("bull");

const pushQueue = new Queue("pushQueue", process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 }, 
  },
});

module.exports = pushQueue;