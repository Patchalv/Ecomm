const createError = require('http-errors');
const orderModel = require('../models/orderModel');
const orderItemModel = require('../models/orderItemModel');

module.exports = class orderService {

  async create(data) {
    const { user_id } = data;

    try {

      // Instantiate new order and save
      const Order = new orderModel();
      const order = await Order.create({ user_id, total });

      return cart;

    } catch(err) {
      throw err;
    }

  };

  async list(user_id) {
    try {
      // Load user orders based on ID
      const orders = await orderModel.findByUser(user_id);

      return orders;

    } catch(err) {
      throw err;
    }
  }

  async findById(order_id) {
    try {
      // Load user orders based on ID
      const order = await orderModel.findById(order_id);

      return order;

    } catch(err) {
      throw err;
    }
  }

}