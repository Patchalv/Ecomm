const express = require('express');
const router = express.Router();

const cartService = require('../services/cartService');
const cartServiceInstance = new cartService();

module.exports = (app, passport) => {

  app.use('/carts', router);

  router.get('/mine', async (req, res, next) => {
    try {
      const { user_id } = req.user;
      
      const response = await cartServiceInstance.loadCart(user_id);

      res.status(200).send(response);

    } catch(err) {
      next(err);
    }
  });

  router.put('/mine', async (req, res, next) => {
    try {
      const { user_id } = req.user;
    
      const response = await cartServiceInstance.get({ user_id });
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/mine', async (req, res, next) => {
    try {
      const { id } = req.user;
    
      const response = await cartServiceInstance.create({ user_id: id });

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/mine/items', async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;
    
      const response = await cartServiceInstance.addItem(id, data);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.put('/mine/items/:cart_item_Id', async (req, res, next) => {
    try {
      const { cart_item_Id } = req.params;
      const data = req.body;
    
      const response = await cartServiceInstance.updateItem(cart_item_Id, data);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.delete('/mine/items/:cart_item_Id', async (req, res, next) => {
    try {
      const { cart_item_Id } = req.params;
    
      const response = await cartServiceInstance.removeItem(cart_item_Id);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  router.post('/mine/checkout', async (req, res, next) => {
    try {
      const { user_id } = req.user;

      const { cart_Id, paymentInfo } = req.body; 

      const response = await cartServiceInstance.checkout(cart_Id, user_id, paymentInfo);

      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
}