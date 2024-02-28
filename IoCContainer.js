class IoCContainer {
  constructor() {
    this.services = new Map();
  }

  registerService(serviceName, service) {
    this.services.set(serviceName, service);
  }

  getService(serviceName) {
    return this.services.get(serviceName);
  }
}

// Singleton instance of the IoC container
const iocContainer = new IoCContainer();

module.exports = { iocContainer };
