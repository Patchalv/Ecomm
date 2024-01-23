const express = require('express');
const router = express.Router();

const productService = require('../services/productService');
const productServiceInstance = new productService();


module.exports = (app) => {

    // http://localhost:PORT/products/
    app.use('/products', router);



    // GET all products (with query parameters)

    router.get('/', async (req, res, next) => {
        try {
            const queryParams = req.query;
            const response = await productServiceInstance.list(queryParams);
            res.status(200).send(response);            
        } catch (error) {
            next(error);
        }
    })


    // GET specific product by ID

    router.get('/:product_id', async (req, res, next) => {
        try {
            const { product_id } = req.params;
            
            const response = await productServiceInstance.get({ id: product_id });          
            
            res.status(200).send(response);

        } catch(err) {
          next(err);
        }
    });
    
}