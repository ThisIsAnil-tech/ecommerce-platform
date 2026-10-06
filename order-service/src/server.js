const express = require('express');
const mongoose = require('mongoose');
const orderController = require('./controllers/orderController');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/order-service');

app.post('/orders', orderController.createOrder);
app.get('/orders/:id', orderController.getOrder);
app.get('/orders/user/:userId', orderController.getUserOrders);

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});