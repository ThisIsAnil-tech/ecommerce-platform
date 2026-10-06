const Order = require('../models/Order');
const axios = require('axios');

class OrderService {
  async createOrder(orderData) {
    const order = new Order(orderData);
    
    try {
      await axios.put('http://inventory-service:3004/inventory', {
        productId: orderData.products[0].productId,
        quantity: orderData.products[0].quantity
      });
    } catch (error) {
      throw new Error('Inventory update failed');
    }

    return await order.save();
  }

  async getOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async getOrdersByUser(userId) {
    return await Order.find({ userId });
  }
}

module.exports = new OrderService();