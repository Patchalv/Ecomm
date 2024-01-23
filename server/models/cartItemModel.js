const { query } = require('../db/db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class cartItemModel {

  /**
   * Creates a new cart line item
   * @param  {Object}      data [Cart item data]
   * @return {Object|null}      [Created cart item]
   */
  static async create(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'cart_item') + 'RETURNING *';
 
      // Execute SQL statment
      const result = await query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates existing cart item
   * @param  {Object}      data [Cart item data]
   * @param  {Object}      id   [Cart item id]
   * @return {Object|null}      [Updated cart item]
   */
  static async update(id, data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE cart_item_id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(data, null, 'cart_item') + condition;
  
      // Execute SQL statment
      const result = await query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieve cart items for a cart
   * @param  {Object} cart_id [Cart ID]
   * @return {Array}         [Created cart item]
   */
  static async find(cart_id) {
    try {

      // Generate SQL statement
      const statement = `SELECT 
                            ci.quantity,
                            ci.cart_item_id AS "cart_item_id", 
                            p.*
                         FROM "cart_item" ci
                         INNER JOIN products p ON p.product_id = ci."product_id"
                         WHERE "cart_id" = $1`
      const values = [cart_id];
  
      // Execute SQL statment
      const result = await query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes a cart line item
   * @param  {Object}      id [Cart item ID]
   * @return {Object|null}    [Deleted cart item]
   */
  static async delete(cart_item_Id) {
    try {

      // Generate SQL statement
      const statement = `DELETE
                         FROM "cart_items"
                         WHERE cart_item_Id = $1
                         RETURNING *`;
      const values = [cart_item_Id];
  
      // Execute SQL statment
      const result = await query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}