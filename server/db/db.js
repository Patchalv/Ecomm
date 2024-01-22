const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
  });
  
  module.exports = {
    query: (text, params) => {
      return pool.query(text, params);
    }
  }