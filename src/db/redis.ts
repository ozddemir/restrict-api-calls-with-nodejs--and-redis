import * as redis from 'redis'


export const redisClient = redis.createClient({
  socket: {
    port: Number(process.env.REDIS_PORT),

    // I couldn't figure how to set the same redis connection both pord and dev env. Help is needed.
    host: process.env.NODE_ENV === "production" ? process.env.REDIS_HOST_PROD : process.env.REDIS_HOST_DEV,
    tls: false
  }
});
(async () => {
  await redisClient.connect();
})();

redisClient.on('error', (err) => {
  console.log(err);
});
redisClient.on('connect', () => {
  console.log('Connected');
});
redisClient.on('end', () => {
  console.log('Connection ended');
});
