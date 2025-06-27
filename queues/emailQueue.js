const Queue = require("bull");

const emailQueue = new Queue("emailQueue", process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 }, 
  },
});

emailQueue.on("ready", () => {
  console.log("Redis connection ready for Bull Queue.");
});

emailQueue.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = emailQueue;
