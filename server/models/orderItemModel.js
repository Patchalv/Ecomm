const { query } = require('../db/db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderItemModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.description = data.description;
    this.modified = moment.utc().toISOString();
    this.name = data.name;
    this.price = data.price || 0;
    this.product_id = data.product_id;
    this.quantity = data.quantity || 1;
    this.order_id = data.order_id || null;
  }

  /**
   * Creates a new order item
   * @param  {Object}      data [Order item data]
   * @return {Object|null}      [Created order item]
   */
  static async create(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'order_Item') + 'RETURNING *';
 
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
   * Retrieve order items for an order
   * @param  {Object} order_id [Order ID]
   * @return {Array}          [Created cart item]
   */
  static async find(order_id) {
    try {

      // Generate SQL statement
      const statement = `SELECT 
                            oi.quantity,
                            oi.order_item_id AS "order_item_id", 
                            p.*
                         FROM "order_item" oi
                         INNER JOIN products p ON p.product_id = oi."product_id"
                         WHERE "order_id" = $1`
      const values = [order_id];
  
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

}