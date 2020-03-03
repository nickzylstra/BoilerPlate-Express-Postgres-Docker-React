const log = require('fancy-log');
const { createDb } = require('../src/database');

process.env.NODE_ENV = 'test';
process.env.POSTGRES_DB = 'boilerplate_test';
process.env.POSTGRES_USER = 'test';
process.env.POSTGRES_PASSWORD = 'test';

module.exports = async function createTestDb() {
  try {
    await createDb(process.env.POSTGRES_DB);
  } catch (error) {
    log(error);
  }
};
