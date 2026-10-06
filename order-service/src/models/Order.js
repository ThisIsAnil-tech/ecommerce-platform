const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [{
    productId: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);