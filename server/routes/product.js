const express = require('express');
const router = express.Router();
const productInstance = require('../models/product');

// http://localhost:PORT/products/


//GET all products

router.get('/', async (req, res) => {
    try {
        const productList = await productInstance.getAllProducts();
        res.json(productList);
    } catch (error) {
        res.status(400).send(error);
    }
})

//GET specific product by ID

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    
    try {
        
        const product = await productInstance.getProductById(productId);

        if (!product) return res.status(404).send('Invalid product Id');

        res.json(product);

    } catch (error) {
        res.status(400).send(error);
    }
})

// CREATE a product
/*
Postman - test
POST    http://localhost:3000/product/addProduct
Body: { "name": "Newly Created Product", "slug": "test2", "price": 7.99, "description": "Lightweight and breathable socks", "image_url": "https://imgeng.jagran.com/images/2023/sep/best%2015%20inch%20laptops%20in%20India1695872319038.jpg" }
*/


router.post('/', async (req, res) => {
    const { name, slug, price, description, image_url } = req.body;
    
    try {
        if (!name || !slug || !price || !description || !image_url) {
            return res.status(400).send('Please provide name, slug, price, description and image_url in the request body.')
        }

        await productInstance.addProduct(name, slug, price, description, image_url);

        res.send('Successfully inserted into product table.');

    } catch (error) {
        console.error('Error:', error); // Log the error to the console
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

