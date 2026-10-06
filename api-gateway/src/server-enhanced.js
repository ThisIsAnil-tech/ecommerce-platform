const express = require('express');
const axios = require('axios');
const authMiddleware = require('./middleware/auth');
const CircuitBreaker = require('./services/circuitBreaker');
const { retryOperation } = require('./services/retryHandler');

const app = express();
app.use(express.json());

const services = {
  users: 'http://user-service:3001',
  products: 'http://product-service:3002',
  orders: 'http://order-service:3003',
  inventory: 'http://inventory-service:3004'
};

const circuitBreakers = {
  users: new CircuitBreaker(),
  products: new CircuitBreaker(),
  orders: new CircuitBreaker(),
  inventory: new CircuitBreaker()
};

app.use('/api/*', authMiddleware);

app.get('/api/products', async (req, res) => {
  const fallback = () => ({ products: [], message: 'Product service temporarily unavailable' });
  
  try {
    const result = await circuitBreakers.products.call(
      () => retryOperation(() => axios.get(`${services.products}/products`)),
      fallback
    );
    res.json(result.data);
  } catch (error) {
    res.status(503).json(fallback());
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderResult = await circuitBreakers.orders.call(
      () => retryOperation(() => axios.post(`${services.orders}/orders`, req.body)),
      () => ({ error: 'Order service unavailable' })
    );

    const inventoryResult = await circuitBreakers.inventory.call(
      () => retryOperation(() => axios.put(`${services.inventory}/inventory`, {
        productId: req.body.productId,
        quantity: req.body.quantity
      })),
      () => ({ error: 'Inventory service unavailable' })
    );

    res.json({ 
      order: orderResult.data, 
      inventory: inventoryResult.data 
    });
  } catch (error) {
    res.status(500).json({ error: 'Order processing failed' });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  const fallback = () => ({ orders: [], message: 'Service temporarily unavailable' });
  
  try {
    const result = await circuitBreakers.orders.call(
      () => retryOperation(() => axios.get(`${services.orders}/orders/user/${req.params.userId}`)),
      fallback
    );
    res.json(result.data);
  } catch (error) {
    res.status(503).json(fallback());
  }
});

app.listen(3000, () => {
  console.log('Enhanced API Gateway running on port 3000');
});