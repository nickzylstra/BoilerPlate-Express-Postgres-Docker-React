/* eslint-disable camelcase */
const { pool } = require('../index');


async function create(name, email) {
  const text = 'INSERT INTO customers(name, email) VALUES($1, $2) RETURNING customer_id';
  const values = [name, email];
  const { customer_id } = (await pool.query({ text, values })).rows[0];

  return customer_id;
}

module.exports = {
  create,
};
