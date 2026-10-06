const inventoryService = require('../services/inventoryService');

class InventoryController {
  async updateInventory(req, res) {
    try {
      const inventory = await inventoryService.updateStock(
        req.body.productId,
        req.body.quantity
      );
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInventory(req, res) {
    try {
      const inventory = await inventoryService.getStock(req.params.productId);
      res.json(inventory);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new InventoryController();