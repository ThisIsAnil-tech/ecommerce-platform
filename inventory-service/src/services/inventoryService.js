const Inventory = require('../models/Inventory');

class InventoryService {
  async updateStock(productId, quantity) {
    let inventory = await Inventory.findOne({ productId });
    
    if (!inventory) {
      inventory = new Inventory({ productId, quantity: 0, reserved: 0 });
    }

    if (inventory.quantity - inventory.reserved < quantity) {
      throw new Error('Insufficient stock');
    }

    inventory.reserved += quantity;
    return await inventory.save();
  }

  async getStock(productId) {
    const inventory = await Inventory.findOne({ productId });
    if (!inventory) {
      throw new Error('Inventory not found');
    }
    return inventory;
  }
}

module.exports = new InventoryService();