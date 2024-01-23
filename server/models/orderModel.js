const { query } = require('../db/db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });
const orderItemModel = require('./orderItemModel');

module.exports = class orderModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || 'PENDING';
    this.total = data.total || 0;
    this.user_Id = data.user_Id || null;
  }

  addItems(items) {
    this.items = items.map(item => new orderItem(item));
  }

  /**
   * Creates a new order for a user
   * @return {Object|null}        [Created order record]
   */
  async create() {
    try {

      const { items, ...order } = this;

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(order, null, 'orders') + ' RETURNING *';

      // Execute SQL statment
      const result = await query(statement);

      if (result.rows?.length) {

        // Add new information generated in the database (ie: id) to the Order instance properties
        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates an order for a user
   * @param  {Object}      id   [Order ID]
   * @param  {Object}      data [Order data to update]
   * @return {Object|null}      [Updated order record]
   */
  async update(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE order_id = ${id} RETURNING *', { id: this.id });
      const statement = pgp.helpers.update(data, null, 'orders') + condition;
  
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
   * Loads orders for a user
   * @param  {number} userId [User ID]
   * @return {Array}         [Order records]
   */
  static async findByUser(user_Id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM orders
                         WHERE "user_Id" = $1`;
      const values = [user_Id];
  
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

  /**
   * Retrieve order by ID
   * @param  {number}      order_Id [Order ID]
   * @return {Object|null}         [Order record]
   */
  static async findById(order_Id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM orders
                         WHERE order_id = $1`;
      const values = [order_id];
  
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