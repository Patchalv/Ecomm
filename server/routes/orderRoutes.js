const express = require('express');
const router = express.Router();

const orderService = require('../services/OrderService');
const orderServiceInstance = new orderService();

module.exports = (app) => {

  app.use('/orders', router);

  router.get('/', async (req, res, next) => {
    try {
      const { user_id } = req.user;
  
      const response = await orderServiceInstance.list(user_id);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.get('/:order_id', async (req, res, next) => {
    try {
      const { order_id } = req.params;
  
      const response = await orderServiceInstance.findById(order_id);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }


  });

}