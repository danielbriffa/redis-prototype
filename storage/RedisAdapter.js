class RedisAdapter {
  constructor() {}

  async getMessage(id, data) {
    return {
      name: id,
      data: Object.values(data).map((x) => JSON.parse(x))
    };
  }
}

module.exports = { RedisAdapter };
