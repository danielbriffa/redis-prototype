const redis = require('redis');

class Redis {
  constructor() {
    this.client = redis.createClient({
      password: '',
      socket: {
        host: '',
        port: 1234
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
