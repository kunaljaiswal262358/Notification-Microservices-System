const Queue = require("bull");
const Redis = require("ioredis");

const createQueue = (name) => {
  return new Queue(name, {
    createClient: (type) => {
      switch (type) {
        case "client":
          return new Redis(process.env.REDIS_URL);
        case "subscriber":
          return new Redis(process.env.REDIS_URL, {
            enableReadyCheck: false,
            maxRetriesPerRequest: null,
          });
        case "bclient":
          return new Redis(process.env.REDIS_URL, {
            enableReadyCheck: false,
            maxRetriesPerRequest: null,
          });
        default:
          throw new Error("Unexpected Connection Type: " + type);
      }
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    },
  });
};

const emailQueue = createQueue("emailQueue");
const smsQueue = createQueue("smsQueue");

module.exports = { emailQueue, smsQueue };
