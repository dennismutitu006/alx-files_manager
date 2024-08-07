import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis client creation failure:', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((res, rej) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          rej(err);
        } else {
          res(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((res, rej) => {
      this.client.setex(key, value, duration, (err, reply) => {
        if (err) {
          rej(err);
        } else {
          res(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((res, rej) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          rej(err);
        } else {
          res(reply);
        }
      });
    });
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
