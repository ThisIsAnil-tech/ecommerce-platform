const express = require('express');
const axios = require('axios');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

const services = {
  users: 'http://user-service:3001',
  products: 'http://product-service:3002',
  orders: 'http://order-service:3003',
  inventory: 'http://inventory-service:3004'
};

app.use('/api/*', authMiddleware);

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${services.products}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Product service unavailable' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderResponse = await axios.post(`${services.orders}/orders`, req.body);
    const inventoryResponse = await axios.put(`${services.inventory}/inventory`, {
      productId: req.body.productId,
      quantity: req.body.quantity
    });
    res.json({ order: orderResponse.data, inventory: inventoryResponse.data });
  } catch (error) {
    res.status(500).json({ error: 'Order processing failed' });
  }
});

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});