const createError = require('http-errors');
const productModel = require('../models/productModel');
const productModelInstance = new productModel();

module.exports = class productService {

    async list(options) {
        try {
            //load products
            const products = await productModelInstance.find(options);

            return products;
        } catch (error) {
            throw error;
        }
    };



    async get(data) {

        const { id } = data;

        try {
            // Check if product exists
            const product = await productModelInstance.findOneById(id);


            // If no product found, throw error
            if (!product) {
                throw createError(404, 'Product not found');
            }

            return product;

        } catch (error) {
            throw error;
        }
    };

}