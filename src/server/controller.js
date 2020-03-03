const db = require('../database/models');


async function testDb() {
  await db.testDb();
}

async function createCustomer(name, email, password) {
  return db.customers.create(name, email, password);
}

module.exports = {
  testDb,
  createCustomer,
};
