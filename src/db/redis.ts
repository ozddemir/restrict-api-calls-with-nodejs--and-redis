import * as redis from 'redis'

export const redisClient = redis.createClient({
  socket: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.NODE_ENV === "production" ? process.env.REDIS_HOST_PROD : process.env.REDIS_HOST_DEV,
    tls: false
  }
});
(async () => {
  await redisClient.connect();
})();

redisClient.on('error', (err) => {
  console.log(`Could not establish a connection with redis. ${err}`);
});
redisClient.on('connect', () => {
  console.log('Connected to redis successfully');
});
redisClient.on('end', () => {
  console.log('Connection ended');
});
