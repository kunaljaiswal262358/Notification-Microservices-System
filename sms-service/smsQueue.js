import Queue from "bull";
let queue;

export const createQueue = async (queueName) => {
  try {
    const redisUri = process.env.REDIS_URI;
    queue = new Queue("sms-queue", redisUri);
    //impliment connection failure logs
    await queue.isReady();
    return queue;
  } catch (err) {
    if (queue) await queue.close();
    throw err;
  }
};

export const getQueue = () => queue;
