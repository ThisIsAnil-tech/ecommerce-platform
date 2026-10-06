const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const services = {
  gateway: 'http://api-gateway:3000',
  products: 'http://product-service:3002',
  users: 'http://user-service:3001',
  orders: 'http://order-service:3003',
  inventory: 'http://inventory-service:3004'
};

app.get('/api/health', async (req, res) => {
  try {
    const healthChecks = await Promise.allSettled([
      axios.get(services.gateway + '/health'),
      axios.get(services.products + '/health'),
      axios.get(services.users + '/health'),
      axios.get(services.orders + '/health'),
      axios.get(services.inventory + '/health')
    ]);

    const status = {
      gateway: healthChecks[0].status === 'fulfilled' ? 'UP' : 'DOWN',
      products: healthChecks[1].status === 'fulfilled' ? 'UP' : 'DOWN',
      users: healthChecks[2].status === 'fulfilled' ? 'UP' : 'DOWN',
      orders: healthChecks[3].status === 'fulfilled' ? 'UP' : 'DOWN',
      inventory: healthChecks[4].status === 'fulfilled' ? 'UP' : 'DOWN'
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Health check failed' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(services.gateway + '/api/products');
    res.json(response.data);
  } catch (error) {
    res.json({ products: [], error: 'Failed to fetch products' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(8080, () => {
  console.log('Frontend running on port 8080');
});
