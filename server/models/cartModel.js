const { query } = require('../db/db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class cartModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || true;
  }

  /**
   * Creates a new cart for a user
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Created user record]
   */
  async create(user_id) {
    try {

      const data = { user_id, ...this}

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'cart') + 'RETURNING *';
  
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
   * Loads a cart by User ID
   * @param  {number}      id [User ID]
   * @return {Object|null}    [Cart record]
   */
  static async findOneByUser(user_id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM cart
                         WHERE "user_id" = $1`;
      const values = [user_id];
  
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
   * Loads a cart by ID
   * @param  {number}      id [Cart ID]
   * @return {Object|null}    [Cart record]
   */
  static async findOneById(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM carts
                         WHERE cart_id" = $1`;
      const values = [id];
  
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