const { iocContainer } = require('./IoCContainer');
const { Redis } = require('./storage/Redis');
const { RedisAdapter } = require('./storage/RedisAdapter');
const { config } = require('./constants');

switch (config.storage) {
  case 'Redis':
    iocContainer.registerService('Storage', new Redis());
    iocContainer.registerService('Adapter', new RedisAdapter());
    break;
}
