const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  quantity: Number,
  reserved: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);