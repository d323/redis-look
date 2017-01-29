import P from 'bluebird';
import redis from 'redis';

P.promisifyAll(redis.RedisClient.prototype);

let client;

const lookup = (key) => {
  checkClient();
  return client.getAsync(key);
};

const allKeys = () => {
  checkClient();
  return client.keysAsync('*');
};

const checkClient = () => {
  if (!client) client = redis.createClient(6379, 'cache');
};

export { lookup, allKeys };
