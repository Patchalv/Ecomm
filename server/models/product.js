const { query } = require('../db/db');


// Get all products

const getAllProducts = async () => {
    try {
        const result = await query(
            "SELECT * FROM products"
        );
        return result.rows;
        
    } catch (error) {
        throw err.stack;
    }
}

//GET specific product by ID


const getProductById = async (productId) => {
    try {
        const statement = `
        SELECT * FROM products WHERE product_id = $1
        `;

        const values = [productId];

        const result = await query(statement, values);
            
        return result.rows[0];
        
    } catch (error) {
        throw error;
    }
}


// CREATE a product
const addProduct = async (name, slug, price, description, image_url) => {
    try {
        const statement = `
        INSERT INTO products (name, slug, price, description, image_url)
        VALUES($1, $2, $3, $4, $5)
        `;

        const body = [name, slug, price, description, image_url];

        const result = await query(statement, body);

        return result;
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts, 
    getProductById,
    addProduct,
};