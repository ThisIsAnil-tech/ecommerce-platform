const express = require('express');
const mongoose = require('mongoose');
const inventoryController = require('./controllers/inventoryController');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventory-service');

app.put('/inventory', inventoryController.updateInventory);
app.get('/inventory/:productId', inventoryController.getInventory);

app.listen(3004, () => {
  console.log('Inventory Service running on port 3004');
});