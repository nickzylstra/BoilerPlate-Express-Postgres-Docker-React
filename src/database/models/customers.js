/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const { pool } = require('../index');


async function create(name, email, password) {
  const saltRounds = 10;
  const password_salthash = await bcrypt.hash(password, saltRounds);

  const text = 'INSERT INTO customers(name, email, password_salthash) VALUES($1, $2, $3) RETURNING customer_id';
  const values = [name, email, password_salthash];
  const { customer_id } = (await pool.query({ text, values })).rows[0];

  return customer_id;
}

async function remove(customer_id) {
  const text1 = 'DELETE FROM customers WHERE customer_id = $1 RETURNING customer_id';
  const values1 = [customer_id];
  // eslint-disable-next-line max-len
  const deletedCustomerId = (await pool.query({ text: text1, values: values1 })).rows[0].customer_id;

  return deletedCustomerId;
}

module.exports = {
  create,
  remove,
};
