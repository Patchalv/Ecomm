const { query } = require('../db/db');

module.exports = class productModel {


   /**
     * List products
     * @param  {Object} options [Query options]
     * @return {Array}          [Array of products]
   */

    async find(options = {}) {
        try {
            const statement = `SELECT *
                              FROM products`;
            const values = [];
            
            const result = await query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];

        } catch (error) {
            throw error;        
        }
    }


  /**
   * Finds a product record by ID
   * @param  {String}      id [Product ID]
   * @return {Object|null}    [Product Record]
   */


    async findOneById(id) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM products
                             WHERE product_id = $1`;
            const values = [id];
      
          // Execute SQL statment
          const result = await query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0]
          }
      
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
    }
}