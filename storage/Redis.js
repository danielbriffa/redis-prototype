const redis = require('redis');

class Redis {
  constructor() {
    this.client = redis.createClient({
      password: 'pgi8voY622QbIiXO7ZU2a9PoyfDYzfRI',
      socket: {
        host: 'redis-10024.c311.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 10024
      },
      legacyMode: true
    });

    this.client.connect();
  }

  async getMessage(id) {
    return new Promise(async (resolve, reject) => {
      this.client.HGETALL(id, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }
}

module.exports = { Redis };
