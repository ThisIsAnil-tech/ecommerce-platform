const Product = require('../models/Product');

class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }
}

module.exports = new ProductService();