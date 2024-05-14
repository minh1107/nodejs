const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ant-center',
  password: '01653663844abc',
  port: 5432,
});

module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (err) {
      console.error("Error executing query", err.stack);
      throw err;
    }
  },
};