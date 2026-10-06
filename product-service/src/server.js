const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product-service');

app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProduct);
app.post('/products', productController.createProduct);

app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});