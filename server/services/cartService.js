const createError = require('http-errors');
const cartModel = require('../models/cartModel');
const orderModel = require('../models/orderModel');
const cartItemModel = require('../models/cartItemModel');

module.exports = class cartService {

  async create(data) {
    const { user_Id } = data;

    try {

      // Instantiate new cart and save
      const Cart = new cartModel();
      const cart = await Cart.create(user_id);

      return cart;

    } catch(err) {
      throw err;
    }

  };

  async loadCart(user_id) {
    try {
      // Load user cart based on ID
      const Cart = await cartModel.findOneByUser(user_id);

      // Load cart items and add them to the cart record
      const items = await cartItemModel.find(cart_id);
      cart.items = items;

      return cart;

    } catch(err) {
      throw err;
    }
  }

  async addItem(user_id, item) {
    try {
      // Load user cart based on ID
      const cart = await cartModel.findOneByUser(user_id);

      // Create cart item
      const cartItem = await cartItemModel.create({ cart_Id: cart.id, ...item });

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async removeItem(cart_item_Id) {
    try {
      // Remove cart item by line ID
      const cartItem = await cartItemModel.delete(cart_item_Id);

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async updateItem(cart_item_Id, data) {
    try {
      // Remove cart item by line ID
      const cartItem = await cartItemModel.update(cart_item_Id, data);

      return cartItem;

    } catch(err) {
      throw err;
    }
  }

  async checkout(cart_Id, user_id, paymentInfo) {
    try {

      const stripe = require('stripe')('sk_test_FOY6txFJqPQvJJQxJ8jpeLYQ');

      // Load cart items
      const cartItems = await cartItemModel.find(cart_Id);

      // Generate total price from cart items
      const total = cartItems.reduce((total, item) => {
        return total += Number(item.price);
      }, 0);

      // Generate initial order
      const Order = new orderModel({ total, user_id });
      Order.addItems(cartItems);
      await Order.create();

      // Make charge to payment method (not required in this project)
      const charge = await stripe.charges.create({
        amount: total,
        currency: 'eur',
        source: paymentInfo.id,
        description: 'Ecomm purchase'
      });

      // On successful charge to payment method, update order status to COMPLETE
      const order = Order.update({ status: 'COMPLETE' });

      return order;

    } catch(err) {
      throw err;
    }
  }

}