module.exports = {
  database: {
    user: process.env.DB_USER || 'mongodb://localhost:27017/user-service',
    product: process.env.DB_PRODUCT || 'mongodb://localhost:27017/product-service',
    order: process.env.DB_ORDER || 'mongodb://localhost:27017/order-service',
    inventory: process.env.DB_INVENTORY || 'mongodb://localhost:27017/inventory-service'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES || '24h'
  },
  services: {
    port: {
      gateway: process.env.GATEWAY_PORT || 3000,
      user: process.env.USER_PORT || 3001,
      product: process.env.PRODUCT_PORT || 3002,
      order: process.env.ORDER_PORT || 3003,
      inventory: process.env.INVENTORY_PORT || 3004
    }
  }
};