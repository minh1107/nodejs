const db = require('../db');

const getMessage = async() => {
  // query db
  const result = await db.query('SELECT * FROM users');
  console.log(result.rows)
  return "Hello, world!";
};

module.exports = {
  getMessage
};