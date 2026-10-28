import Queue from 'bull';

export async function createQueue() {
    const queueName = "email-queue"
    const redisUri = process.env.REDIS_URI;
    return new Queue(queueName, redisUri);
}
