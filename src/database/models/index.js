const log = require('fancy-log');
const { pool } = require('../index');
const customers = require('./customers');

async function testDb() {
  const res = await pool.query('SELECT NOW()');
  log(`db tested at: ${res.rows[0].now}`);
}

module.exports = {
  testDb,
  customers,
};
