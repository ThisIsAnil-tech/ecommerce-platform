const serviceRegistry = {
  'user-service': {
    url: 'http://user-service:3001',
    health: '/health',
    instances: 1
  },
  'product-service': {
    url: 'http://product-service:3002',
    health: '/health',
    instances: 1
  },
  'order-service': {
    url: 'http://order-service:3003',
    health: '/health',
    instances: 1
  },
  'inventory-service': {
    url: 'http://inventory-service:3004',
    health: '/health',
    instances: 1
  }
};

module.exports = { serviceRegistry };